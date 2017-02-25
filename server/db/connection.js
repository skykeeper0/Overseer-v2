const Sequelize = require('sequelize')

// create connection with localhost
const sequelize = new Sequelize('student','skye','123', {
    host: 'localhost',
    dialect: 'postgres',
    port: '7979'
})

module.exports = { Sequelize, sequelize }