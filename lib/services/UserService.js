const bcrypt = require('bcrypt');
const { User } = require('../models/User.js');
module.exports = class UserService {
  static async create({ email, password }) {
    // hash the password using bcrypt library
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    // insert the user into the database using the Model
    const user = await User.insert({ email, passwordHash });
    // return the user
    return user;
  }
};
