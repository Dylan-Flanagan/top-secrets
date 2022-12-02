const { Router } = require('express');
const { post } = require('../app.js');
const UserService = require('../services/UserService.js');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      // send the request body to the user service to hash the password
      const user = await UserService.create(req.body);
      // respond with the new user
      res.json(user);
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      // send the request body to the User Service to check password => return our
      const token = await UserService.signIn(req.body);
      // set a cookie on the response object with the JWT as the value (cookies are just )
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!' });
      // send a 200 response
    } catch (e) {
      next(e);
    }
  });
