const { checkDatabase } = require('./database.js');

function accountCreation() { 
    // Used for sign up
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    const missingFields = document.getElementById('missingFields');
    const passwordMismatch = document.getElementById('passwordMismatch');
    const success = document.getElementById('successfulSignup');

    passwordMismatch.style.display = 'none';
    missingFields.style.display = 'none';
    success.style.display = 'none';

    if (!password || !confirmPass || !email) {
        missingFields.style.display = 'inline';
        return;
    }

    if (password != confirmPass) {
        passwordMismatch.style.display = 'inline';
        return;
    } else {
        success.style.display = 'inline';
    }
    // alert('email is' + email + '\n' + 'password is' + password + '\n' + "pass confirm is " + confirmPass);


}

async function accountSignin() {
    // Used for sign in
    const email1 = document.getElementById('signInEmail').value;
    const password1 = document.getElementById('signInPassword').value;
    const missingFields1 = document.getElementById('missingFields1');
    const success1 = document.getElementById('successfulSignup1');

    alert('email is' + email1 + '\n' + 'password is' + password1);

    if (!email1 || !password1) {
        missingFields1.style.display = 'inline';
        return;
    }

    try {
        console.log("in accountsignin");
        const user = await checkDatabase(email1, password1);

        if (user) {
            success1.style.display = 'inline';
        } else {
            alert('invalid');
        }
    } catch (error) {
        console.error("error getting from database:", error);
        alert("error signing in");
    }
    // const pool = mysql.createPool({
    //     host: process.env.MYSQL_HOST,
    //     user: process.env.MYSQL_USER,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.MYSQL_DATABASE
    // });

    // try {
    //     // Get a connection from the pool
    //     const connection = await pool.getConnection();

    //     // Query the database to check if user exists
    //     const [rows, fields] = await connection.query('SELECT * FROM users WHERE email = ? AND pass = ?', [email, password]);

    //     // Release the connection back to the pool
    //     connection.release();

    //     if (rows.length > 0) {
    //         // User exists, display success message
    //         alert('Sign-in successful!');
    //         // You can also redirect the user to another page or perform other actions here
    //     } else {
    //         // User not found, display error message
    //         alert('Invalid email or password');
    //     }
    // } catch (error) {
    //     console.error('Error querying database:', error);
    //     alert('Error signing in. Please try again later.');
    // }


}