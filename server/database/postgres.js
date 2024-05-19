const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Pool } = require('pg');

let pool;

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString: process.env.POSTGRES,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    pool = new Pool(JSON.parse(process.env.POSTGRES));
}

module.exports = {
    query: (text, params) => pool.query(text, params),
};