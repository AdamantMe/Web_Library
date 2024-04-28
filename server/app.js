// Import required modules
const cors = require('cors');
const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const postRoutes = require('./routes/postsRoutes');

// Initialize Express app
const app = express();

// Use CORS and JSON middleware
app.use(cors({
  origin: 'http://localhost:5500'
}));
app.use(express.json()); 

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.use('/posts', postRoutes);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;