const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: "newssite"
})

connection.connect((error) => {
    if (error) throw error
})

module.exports = connection
