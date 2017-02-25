const db = require('../db/connection');

const { Sequelize, sequelize } = db;

const Models = {};

Models.User = require('./user');
Models.Project = require('./project');
Models.Task = require('./task');

Models.Project.belongsTo(Models.User);
Models.User.hasMany(Models.Project);

Models.Task.belongsTo(Models.Project);
Models.Project.hasMany(Models.Task);

sequelize.sync({
    // force:true
});

module.exports = Models;
