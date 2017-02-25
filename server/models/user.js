const db = require('../db/connection');

const { Sequelize, sequelize } = db;

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING
    },
    // role: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
});

module.exports = User;
