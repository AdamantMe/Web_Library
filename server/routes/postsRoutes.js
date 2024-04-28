const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.post('/', postsController.createPost);

// Route to get all posts
router.get('/', postsController.getAllPosts);

// Route to get a single post by UUID
router.get('/:uuid', postsController.getPostByUUID);

// Route to update a post by UUID
router.put('/:uuid', postsController.updatePost);

// Route to delete a post by UUID
router.delete('/:uuid', postsController.deletePost);

module.exports = router;