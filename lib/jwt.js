'use strict';

const jwt = require('jsonwebtoken');

class FullJWT {
  constructor(app) {
    this.app = app;
    this.secret = app.config.fullJwt.secret;
    this.exp = app.config.fullJwt.exp || 3600; // default 1 hour
  }

  async sign(payload) {
    const token = await jwt.sign({
      payload,
      exp: Math.floor(Date.now() / 1000) + this.exp,
    }, this.secret);
    return token;
  }

  async verify(token) {
    const decoded = await jwt.verify(token, this.secret);
    return decoded.payload;
  }
}

module.exports = app => {
  app.fullJwt = new FullJWT(app);
};
