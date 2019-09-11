const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const router = express.Router();

// @route Get api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
});

// @route Post api/auth
// @desc Auth logged in
// @access Public
router.post(
  '/',
  [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, config.get('jwtsecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json('server error');
    }
  }
);

module.exports = router;
