const cors = require('cors');
const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const postRoutes = require('./routes/postsRoutes');

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/posts', postRoutes);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use(express.static('public'));

module.exports = app;