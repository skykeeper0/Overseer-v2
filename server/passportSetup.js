const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Models = require('./models');

module.exports = function (app) {
  passport.serializeUser((user, done) => {
    console.log('serializing user');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserialize user');
    Models.User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(new LocalStrategy(
    function (username, password, done) {
      process.nextTick(() => {
        Models.User.findOne({
          where: {
            username: username
          }
        }).then(function (user) {
          console.log('looking for user');
          if (!user) {
            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }

          console.log('found valid user');
          return done(null, user);
        });
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
}
