const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
})

connection.connect((error) => {
    
    if (error) {
        console.log('Unable to connect to MySQL server.')
        throw error
    }
})

module.exports = connection
