const loginService = require('../services/loginService');

exports.loginUser = async (req, res) => {
  try {
    const token = await loginService.loginUser(req.body.username, req.body.password);
    res.json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};