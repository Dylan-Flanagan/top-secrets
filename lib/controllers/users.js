const { Router } = require('express');
const UserService = require('../services/UserService.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    // send the request body to the user service to hash the password
    const user = await UserService.create(req.body);
    // respond with the new user
    res.json(user);
  } catch (e) {
    next(e);
  }
});
