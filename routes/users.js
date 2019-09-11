const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  '/',
  [
    check('name', 'Please enter a name')
      .not()
      .isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists.' });
      }
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, config.get('jwtsecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) {
          console.error(err);
        } else {
          res.json(token);
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'server error' });
    }
  }
);

module.exports = router;
