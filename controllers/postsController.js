const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '..', 'posts.json');

function readPostsFromFile() {
  try {
    const postsData = fs.readFileSync(postsFilePath);
    return JSON.parse(postsData);
  } catch (error) {
    return [];
  }
}

function writePostsToFile(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
}

exports.createPost = (req, res) => {
  const { date, title, body, uuid } = req.body;
  if (!date || !title || !body || !uuid) {
    return res.status(400).send('Missing required fields');
  }

  const posts = readPostsFromFile();
  posts.push({ date, title, body, uuid });
  writePostsToFile(posts);

  res.status(201).send({ message: 'Post created', post: { date, title, body, uuid } });
};

exports.getAllPosts = (req, res) => {
  const posts = readPostsFromFile();
  res.status(200).send(posts);
};

exports.getPostByUUID = (req, res) => {
  const { uuid } = req.params;
  const posts = readPostsFromFile();
  const post = posts.find(p => p.uuid === uuid);

  if (!post) {
    return res.status(404).send('Post not found');
  }

  res.status(200).send(post);
};

exports.updatePost = (req, res) => {
  const { uuid } = req.params;
  let posts = readPostsFromFile();
  const postIndex = posts.findIndex(p => p.uuid === uuid);

  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }

  posts[postIndex] = { ...posts[postIndex], ...req.body };
  writePostsToFile(posts);

  res.status(200).send(posts[postIndex]);
};

exports.deletePost = (req, res) => {
  const { uuid } = req.params;
  let posts = readPostsFromFile();
  const postIndex = posts.findIndex(p => p.uuid === uuid);

  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }

  posts.splice(postIndex, 1);
  writePostsToFile(posts);

  res.status(204).send();
};
