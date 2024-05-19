const booksService = require('../services/booksService');

const createBook = async (req, res) => {
  try {
    const book = await booksService.createBook(req.body);
    res.status(201).send({ message: 'Book created', book });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBookByUUID = async (req, res) => {
  try {
    const book = await booksService.getBookByUUID(req.params.uuid);
    res.status(200).send(book);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await booksService.updateBook(req.params.uuid, req.body);
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    await booksService.deleteBook(req.params.uuid);
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getLatestAdditions = async (req, res) => {
  try {
    const books = await booksService.getLatestAdditions();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getLatestReleases = async (req, res) => {
  try {
    const books = await booksService.getLatestReleases();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBooksByAlphabet = async (req, res) => {
  try {
    const books = await booksService.getBooksByAlphabet();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
};