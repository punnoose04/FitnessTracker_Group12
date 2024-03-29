const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool( {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function checkDatabase(email, password) {
    try {
        console.log("in checkDatabase");
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM users WHERE email = ? AND pass = ?', [email, password]);
        connection.release();

        if (rows.length > 0) {
            console.log(rows[0]);
            return rows[0]; // Return the user data if found
        } else {
            return null; // Return null if user not found
        }
    } catch (error) {
        console.error('Error querying database:', error);
        throw error;
    }
}

async function getUsers(pool) {
        console.log("in getusers");
        try {
          const result = await pool.query('SELECT * FROM users');
        //   console.log(result[0]); 
          return result;
        } catch (error) {
          console.error('Error executing query:', error);
        } finally {
          pool.end(); // Close the pool when done with database operations
        }
}

(async () => {
    try {
      const users = await getUsers(pool); // Assuming 'pool' is defined and accessible
      console.log(users[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  })();

module.exports = {
    checkDatabase
};

