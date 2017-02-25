const Models = require('../models');
const bcrypt = require('bcrypt');

const userController = {};

userController.signup = function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(username.length === 0 || password.length === 0 || firstName.length === 0 || lastName.length === 0 || email.length === 0) {
        res.status(404).end();
    } else {
        const salt = bcrypt.genSaltSync(10);
        // console.log(password, salt);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            salt
        }
        Models.User.create(newUser).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(400).json(err);
        })
    }
}

module.exports = userController;
