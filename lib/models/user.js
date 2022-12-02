const pool = require('../utils/pool.js');

class User {
  #passwordHash

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }
  static async insert ({email, passwordHash}){
    // insert new row in the database
    const {rows} = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *'
    [email, passwordHash]
    );
    return new User(rows[0]);
  }
  // return a User object for the new row
  // id;
  // firstName;
  // lastName;
  // email;
  // #passwordHash;


//   static async insert({ firstName, lastName, email, passwordHash }) {
//     const { rows } = await pool.query(
//       `
//       INSERT INTO users (first_name, last_name, email, password_hash)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *`,
//       [firstName, lastName, email, passwordHash]
//     );
//     return new User(rows[0]);
//   }
// }

module.exports = { User };
