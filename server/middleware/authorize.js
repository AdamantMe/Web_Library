require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header received:', authHeader); // Log the received Authorization Header

  if (!authHeader) {
    console.log('No Authorization Header provided.'); // Log when no Authorization Header is provided
    return res.status(400).end();
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('Invalid Authorization Header format. Expected "Bearer <token>".');
    return res.status(400).end();
  }

  const token = parts[1];
  console.log('Token:', token); // Log the extracted token

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.log('Error verifying token:', err); // Log any errors during verification
      return res.status(403).end();
    }

    console.log('Token verified, user:', user); // Log the decoded user information
    req.user = user;
    next();
  });
};