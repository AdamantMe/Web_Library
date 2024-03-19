const postsService = require('../services/postsService');

const createPost = async (req, res) => {
  try {
    const post = await postsService.createPost(req.body);
    res.status(201).send({ message: 'Post created', post });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPostByUUID = async (req, res) => {
  try {
    const post = await postsService.getPostByUUID(req.params.uuid);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await postsService.updatePost(req.params.uuid, req.body);
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    await postsService.deletePost(req.params.uuid);
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByUUID,
  updatePost,
  deletePost,
};