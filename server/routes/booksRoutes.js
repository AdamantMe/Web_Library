const express = require('express');
const booksController = require('../controllers/booksController');

const router = express.Router();

router.post('/', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:uuid', booksController.getBookByUUID);
router.put('/:uuid', booksController.updateBook);
router.delete('/:uuid', booksController.deleteBook);

module.exports = router;