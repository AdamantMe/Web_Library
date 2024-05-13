const db = require('../postgres');

const createPost = async (post) => {
  const { title, author, date, body, title_image, uuid } = post;
  const result = await db.query(
    'INSERT INTO posts(title, author, date, body, title_image, uuid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, author, date, body, title_image, uuid]
  );
  return result.rows[0];
};

const getAllPosts = async () => {
  const result = await db.query('SELECT * FROM posts');
  return result.rows;
};

const getPostByUUID = async (uuid) => {
  const result = await db.query('SELECT * FROM posts WHERE uuid = $1', [uuid]);
  return result.rows[0];
};

const updatePost = async (uuid, post) => {
  const { title, author, body, title_image } = post;
  try {
    const result = await db.query(
      'UPDATE posts SET title = $1, author = $2, body = $3, title_image = $4 WHERE uuid = $5 RETURNING *',
      [title, author, body, title_image, uuid]
    );

    if (result.rows.length === 0) {
      throw new Error('Post not found or not updated');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Update Post Error:', error);
    throw error;
  }
};

const deletePost = async (uuid) => {
  const result = await db.query('DELETE FROM posts WHERE uuid = $1 RETURNING *', [uuid]);
  return result.rows[0];
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByUUID,
  updatePost,
  deletePost,
};