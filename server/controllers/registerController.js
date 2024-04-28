const express = require('express');
const registerService = require('../services/registerService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await registerService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;