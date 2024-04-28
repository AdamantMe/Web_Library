const bcrypt = require('bcrypt');
const userRepository = require('../database/repos/userRepository');

const registerUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(username, hashedPassword);
  return user;
};

module.exports = { registerUser };