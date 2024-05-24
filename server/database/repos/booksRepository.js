const db = require('../postgres');

const createBook = async (book) => {
    const { title, author, genre, pages, title_image, release_date } = book;
    const query = 'INSERT INTO books (title, author, genre, pages, title_image, release_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [title, author, genre, pages, title_image, release_date];
    const result = await db.query(query, values);
    return result.rows[0];
};

const getAllBooks = async () => {
    const query = 'SELECT * FROM books';
    const result = await db.query(query);
    return result.rows;
};

const getBookByUUID = async (uuid) => {
    const query = 'SELECT * FROM books WHERE uuid = $1';
    const values = [uuid];
    const result = await db.query(query, values);
    return result.rows[0];
};

const updateBook = async (uuid, bookUpdates) => {
    const { title, author, genre, pages, title_image, release_date } = bookUpdates;
    const query = 'UPDATE books SET title = $1, author = $2, genre = $3, pages = $4, title_image = $5, release_date = $6 WHERE uuid = $7 RETURNING *';
    const values = [title, author, genre, pages, title_image, release_date, uuid];
    const result = await db.query(query, values);
    return result.rows[0];
};

const deleteBook = async (uuid) => {
    const query = 'DELETE FROM books WHERE uuid = $1 RETURNING *';
    const values = [uuid];
    const result = await db.query(query, values);
    return result.rows[0];
};

const getLatestAdditions = async () => {
    const query = 'SELECT * FROM books ORDER BY created_at DESC LIMIT 5';
    const result = await db.query(query);
    return result.rows;
};

const getLatestReleases = async () => {
    const query = 'SELECT * FROM books ORDER BY release_date DESC LIMIT 5';
    const result = await db.query(query);
    return result.rows;
};

const getBooksByAlphabet = async () => {
    const query = 'SELECT * FROM books ORDER BY title ASC LIMIT 5';
    const result = await db.query(query);
    return result.rows;
};

const checkDuplicateBook = async (title, author) => {
    const query = 'SELECT * FROM books WHERE title = $1 AND author = $2';
    const values = [title, author];
    const result = await db.query(query, values);
    return result.rows.length > 0;
};

module.exports = {
    createBook,
    getAllBooks,
    getBookByUUID,
    updateBook,
    deleteBook,
    getLatestAdditions,
    getLatestReleases,
    getBooksByAlphabet,
    checkDuplicateBook
};