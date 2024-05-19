const express = require('express');
const booksController = require('../controllers/booksController');

const router = express.Router();

router.post('/', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/latest-additions', booksController.getLatestAdditions);
router.get('/latest-releases', booksController.getLatestReleases);
router.get('/alphabetical', booksController.getBooksByAlphabet);
router.get('/:uuid', booksController.getBookByUUID);
router.put('/:uuid', booksController.updateBook);
router.delete('/:uuid', booksController.deleteBook);

module.exports = router;