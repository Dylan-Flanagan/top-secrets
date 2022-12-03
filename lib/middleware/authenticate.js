const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // get the jwt from the cookie on request
    const cookieJWT = req.cookies && req.cookies[process.env.COOKIE_NAME];
    if (!cookieJWT) throw new Error('You must be signed in');
    // validate jwt
    // if not valid, throw a 401 error
    const user = jwt.verify(cookieJWT, process.env.JWT_SECRET);
    req.user = user;
    // otherwise attach the user to the request and continue
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
