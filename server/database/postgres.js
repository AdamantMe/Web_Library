const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = JSON.parse(process.env.POSTGRES);

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.password
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
