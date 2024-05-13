const db = require('../postgres');

const createBook = async (book) => {
  const { title, author, genre, pages, title_image } = book;
  const query = 'INSERT INTO books (title, author, genre, pages, title_image) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [title, author, genre, pages, title_image];
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
  const { title, author, genre, pages, title_image } = bookUpdates;
  const query = 'UPDATE books SET title = $1, author = $2, genre = $3, pages = $4, title_image = $5 WHERE uuid = $6 RETURNING *';
  const values = [title, author, genre, pages, title_image, uuid];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteBook = async (uuid) => {
  const query = 'DELETE FROM books WHERE uuid = $1 RETURNING *';
  const values = [uuid];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  createBook,
  getAllBooks,
  getBookByUUID,
  updateBook,
  deleteBook,
};