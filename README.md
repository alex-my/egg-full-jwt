# egg-full-jwt

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-full-jwt.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-full-jwt
[travis-image]: https://img.shields.io/travis/eggjs/egg-full-jwt.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-full-jwt
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-full-jwt.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-full-jwt?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-full-jwt.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-full-jwt
[snyk-image]: https://snyk.io/test/npm/egg-full-jwt/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-full-jwt
[download-image]: https://img.shields.io/npm/dm/egg-full-jwt.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-full-jwt

<!--
Description here.
-->

## Chinese 中文

- [点这里](./README.zh_CN.md)

## Important

> jsonwebtoken@8.4.0

## Install

```bash
$ npm i egg-full-jwt --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.fullJwt = {
  enable: true,
  package: 'egg-full-jwt',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.fullJwt = {
  secret: 'your key',
  exp: 'expire time', // default 3600 seconds
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    // /login?userId=10001
    async login() {
      // password check ...

      const { userId } = this.ctx.query;

      const token = await app.fullJwt.sign({ userId });

      // cookies
      this.ctx.cookies.set('token', token, {
        maxAge: 24 * 3600 * 1000 * 1,
        httpOnly: true,
      });

      this.ctx.body = 'login success';
    }

    async index() {
      const token = this.ctx.cookies.get('token');

      if (token === false) {
        this.ctx.redirect('/login');
      }

      const { userId } = await app.fullJwt.verify(token);
      if (userId) {
        this.ctx.redirect('/login');
      }

      this.ctx.body = 'hello World';
    }
  }
  return HomeController;
};
```

## License

[MIT](LICENSE)
