'use strict';

const jwt = require('./lib/jwt');

module.exports = app => {
  jwt(app);
};
