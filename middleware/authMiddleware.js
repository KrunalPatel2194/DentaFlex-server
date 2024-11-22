// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.jwtSecret);
    console.log("varified token ",verified);
    req.user = verified.user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
