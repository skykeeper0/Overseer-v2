const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const passportSetup = require('./passportSetup');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Models = require('./models');
const routes = require('./routes');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const isDevelopment = process.env.NODE_ENV === 'development';

// add hot reload if in development
if (isDevelopment) {
  require('./hotReload')(app);
}

app.use(cookieParser());
app.use(session({
  secret: 'this is a bad secret',
  resave: true,
  saveUninitialized: true,
}));

passportSetup(app);

app.use('/', routes);
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(3000, () => {
  console.log('Port is listening!');
});

module.exports = app;
