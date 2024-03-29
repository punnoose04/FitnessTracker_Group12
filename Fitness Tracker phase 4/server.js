const express = require('express');
const mysql = require('mysql2/promise'); // Database connection
const dotenv = require('dotenv'); // dotenc for database connection
const { checkDatabase } = require('./database.js');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variables or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static('views'));

// Route to handle sign-in request
app.post('/signin', async (req, res) => {
    const { email, password } = req.body; // Get email and password 
    try {
        const user = await checkDatabase(email, password); // Check if user exists
        if (user) {
            res.status(200).send({ message: 'Success', user });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});