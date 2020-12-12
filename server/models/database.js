require('dotenv').config()
const { Sequelize } = require('sequelize')

const connection = new Sequelize({
    host: process.env.SQL_HOST,
    database: process.env.SQL_DATABASE,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    dialect: 'mysql'
})

module.exports = connection
