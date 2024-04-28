require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool(JSON.parse(process.env.POSTGRES));

module.exports = {
 query: (text, params) => pool.query(text, params),
};
