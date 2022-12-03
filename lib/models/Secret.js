const pool = require('../utils/pool.js');

class Secret {
  id;
  title;
  description;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.createdAt;
  }

  static async getAll() {
    const rows = await pool.query('SELECT * from secrets');
    return rows.map((row) => new Secret(row));
  }
}

module.exports = { Secret };
