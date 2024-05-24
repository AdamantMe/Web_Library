const booksRepository = require('../database/repos/booksRepository');

const createBook = async (book) => {
    if (!book.title || !book.author) {
        throw new Error('Missing required fields');
    }
    if (!book.release_date) {
        book.release_date = new Date().toISOString();
    } else {
        book.release_date = new Date(book.release_date).toISOString();
    }

    const isDuplicate = await booksRepository.checkDuplicateBook(book.title, book.author);
    if (isDuplicate) {
        throw new Error('A book with this title and author already exists');
    }

    return await booksRepository.createBook(book);
};

const getAllBooks = async () => {
    return await booksRepository.getAllBooks();
};

const getBookByUUID = async (uuid) => {
    const book = await booksRepository.getBookByUUID(uuid);
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
};

const updateBook = async (uuid, book) => {
    if (!book.title || !book.author) {
        throw new Error('Missing required fields');
    }
    if (book.release_date) {
        book.release_date = new Date(book.release_date).toISOString();
    }
    return await booksRepository.updateBook(uuid, book);
};

const deleteBook = async (uuid) => {
    const bookToDelete = await booksRepository.getBookByUUID(uuid);
    if (!bookToDelete) {
        throw new Error('Book not found');
    }
    return await booksRepository.deleteBook(uuid);
};

const getLatestAdditions = async () => {
    return await booksRepository.getLatestAdditions();
};

const getLatestReleases = async () => {
    return await booksRepository.getLatestReleases();
};

const getBooksByAlphabet = async () => {
    return await booksRepository.getBooksByAlphabet();
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