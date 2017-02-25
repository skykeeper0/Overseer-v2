const Models = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('qwe', salt);

  const newUser = {
    firstName: 'qwe',
    lastName: 'qwe',
    email: 'qwe@qwe.com',
    username: 'qwe',
    password: hash,
    salt,
  };

  Models.User.create(newUser)
    .then((user) => {
      return Models.Project.create({
        name: 'Seed Database',
        userId: user.id,
      });
    })
    .then((project) => {
      return Models.Task.create({
        name: 'add seed.js',
        projectId: project.id,
      });
    })
    .then((task) => {
      console.log('DB SEEDED');
    });
};
