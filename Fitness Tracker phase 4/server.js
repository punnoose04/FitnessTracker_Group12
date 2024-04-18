const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise'); // Database connection
const dotenv = require('dotenv'); // dotenc for database connection
const { checkDatabase, addUser, emailExists, logWorkout, workoutExists, pool } = require('./database.js');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variables or default to 3000

app.use(session({
    secret: 'key', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if your site is served over HTTPS
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static('views'));

// Route to handle sign-in request
app.post('/signin', async (req, res) => {
    const { email, password } = req.body; // Get email and password 
    try {
        const user = await checkDatabase(email, password); // Check if user exists
        if (user) {
            req.session.userId = user.id;
            res.status(200).send({ message: 'Success', user });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (await emailExists(email)) {
            res.status(409).send({ message: 'Email already registered.'});
            // console.log("email already registered");
            return;
        }


        await addUser(email, password);
        res.status(201).send({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send({ message: 'Failed to create account' });
    }
});

app.post('/submit-workouts', async (req, res) => {
    const { date, workouts } = req.body;
    const userId = req.session.userId; // Retrieved from session

    if (!userId) {
        return res.status(403).json({ message: 'User not authenticated' });
    }

    try {
        for (const workout of workouts) {
            const exists = await workoutExists(userId, date, workout.type);
            if (exists) {
                return res.status(409).json({ message: `Workout already logged for ${workout.type} on this date` });
            }

            // Insert workout if it does not exist
            await logWorkout(userId, date, workout.type, workout.weight, workout.sets, workout.reps);
        }
        res.status(201).json({ message: 'Workouts logged successfully' });
    } catch (error) {
        console.error('Failed to log workouts:', error);
        res.status(500).json({ message: 'Error logging workouts' });
    }
});


app.get('/workouts', async (req, res) => {
    const userId = req.session.userId; // Session management
    try {
        const [workouts] = await pool.query('SELECT * FROM workouts WHERE user_id = ?', [userId]);
        res.json(workouts);
    } catch (error) {
        console.error('Failed to fetch workouts:', error);
        res.status(500).json({ message: 'Error fetching workouts' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
