// routes/authRoutes.js

const express = require('express');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Teacher Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, teacher });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
