const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../database/repos/userRepository');

const registerUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(username, hashedPassword);

  const token = jwt.sign({ _id: user.id, username: user.username }, process.env.SECRET, { expiresIn: '2h' });

  return { user, token };
};

module.exports = { registerUser };