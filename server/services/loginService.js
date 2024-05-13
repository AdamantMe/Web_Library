const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../database/repos/userRepository');

exports.loginUser = async (username, password) => {
  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error('Invalid username or password');
  }
  const token = jwt.sign({ _id: user.id, username: user.username }, process.env.SECRET, { expiresIn: '2h' });

  return token;
};