require('dotenv').config();
const db = require('../postgres');
const { Pool } = require('pg');
const pool = new Pool(JSON.parse(process.env.POSTGRES));

const createUser = async (username, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, hashedPassword]
  );
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

module.exports = { 
    createUser,
    getUserByUsername
};