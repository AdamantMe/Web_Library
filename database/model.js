const db = require('./postgres');

module.exports = {
    async getUsers() {
        const sql = `SELECT * FROM users`;
        const result = await db.query(sql);
        return result.rows;
    }
};