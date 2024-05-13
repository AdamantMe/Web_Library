const postsRepository = require('../database/repos/postsRepository');

const createPost = async (post) => {
    if (!post.title || !post.author || !post.body || !post.uuid) {
        throw new Error('Missing required fields');
    }
    return await postsRepository.createPost(post);
};

const getAllPosts = async () => {
    return await postsRepository.getAllPosts();
};

const getPostByUUID = async (uuid) => {
    const post = await postsRepository.getPostByUUID(uuid);
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
};

const updatePost = async (uuid, postUpdates) => {
    const existingPost = await postsRepository.getPostByUUID(uuid);
    if (!existingPost) {
        throw new Error('Post not found');
    }
    return await postsRepository.updatePost(uuid, postUpdates);
};  

const deletePost = async (uuid) => {
    const postToDelete = await postsRepository.getPostByUUID(uuid);
    if (!postToDelete) {
        throw new Error('Post not found');
    }
    return await postsRepository.deletePost(uuid);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostByUUID,
    updatePost,
    deletePost,
};