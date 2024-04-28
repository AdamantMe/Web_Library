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
  const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};