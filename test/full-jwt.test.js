'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');

describe('test/full-jwt.test.js', () => {
  it('should success resolve token', async () => {
    const name = 'egg-full-jwt';
    const token = await app.fullJwt.sign({
      name,
    });
    const payload = await app.fullJwt.verify(token);

    assert.equal(payload.name, name);
  });
});
