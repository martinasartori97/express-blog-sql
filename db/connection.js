const mysql = require('mysql2')


const connection = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // port: process.env.DB_PORT
    host: 'localhost',
    user: 'root',
    password: 'Follonica2024!',
    database: 'blog_db'
})


connection.connect(err => {
    if (err) throw err;
    console.log('Connected to mysql');
})
module.exports = connection
