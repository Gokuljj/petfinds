const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const bcrypt = require('bcryptjs');

// Register new user
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create user
      const user = await User.create({ name, email, password });
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Login user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { registerUser, loginUser };

