const booksRepository = require('../database/repos/booksRepository');

const createBook = async (book) => {
    if (!book.title || !book.author || !book.uuid) {
        throw new Error('Missing required fields');
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

const updateBook = async (uuid, bookUpdates) => {
    const existingBook = await booksRepository.getBookByUUID(uuid);
    if (!existingBook) {
        throw new Error('Book not found');
    }
    return await booksRepository.updateBook(uuid, bookUpdates);
};  

const deleteBook = async (uuid) => {
    const bookToDelete = await booksRepository.getBookByUUID(uuid);
    if (!bookToDelete) {
        throw new Error('Book not found');
    }
    return await booksRepository.deleteBook(uuid);
};

module.exports = {
    createBook,
    getAllBooks,
    getBookByUUID,
    updateBook,
    deleteBook,
};