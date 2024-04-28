const cors = require('cors');
const express = require('express');
const app = express();
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const postRoutes = require('./routes/postsRoutes');
const authorize = require('./middleware/authorize');

// Use CORS and JSON middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/posts', authorize, postRoutes);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;