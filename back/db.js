const mysql = require('mysql');
require('dotenv').config()

module.exports = mysql.createConnection({  
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
}); 