require('babel-register')({
  presets: ['es2015', 'react'],
});

require('./react-tests.js');
require('./ajax-tests.js')