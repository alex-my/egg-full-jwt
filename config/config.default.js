'use strict';

/**
 * egg-full-jwt default config
 * @member Config#fullJwt
 * @property {string} secret - key
 * @property {integer} exp - default 1 hour (second)
 */
exports.fullJwt = {
  secret: 'egg-full-jwt secret',
  // exp: 3600,
};
