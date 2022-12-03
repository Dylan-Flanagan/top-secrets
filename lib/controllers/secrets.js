const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const { Secret } = require('../models/Secret.js');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = await Secret.getAll(); // replace with Secret.getAll() (make the model and function)
    // return the list of secrets
    res.json(secrets);
  } catch (e) {
    next(e);
  }
});
