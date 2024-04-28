const db = require('../postgres');

const createPost = async (post) => {
  const { date, title, body, uuid } = post;
  const result = await db.query(
    'INSERT INTO posts(date, title, body, uuid) VALUES($1, $2, $3, $4) RETURNING *',
    [date, title, body, uuid]
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
  const { title, body } = post; // Assuming only title and body are updated and date is set to current timestamp
  try {
    const result = await db.query(
      'UPDATE posts SET date = NOW(), title = $1, body = $2 WHERE uuid = $3 RETURNING *',
      [title, body, uuid]
    );

    if (result.rows.length === 0) {
      throw new Error('Post not found or not updated');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Update Post Error:', error);
    throw error; // Rethrow to allow further handling if necessary
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
