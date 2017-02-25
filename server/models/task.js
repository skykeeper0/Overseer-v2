const db = require('../db/connection');

const {Sequelize, sequelize} = db;

let Task = sequelize.define('task', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
});

module.exports = Task;
