const express = require('express');
const router = express.Router();

// @route Get api/auth
// @desc Get logged in
// @access Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route Post api/auth
// @desc Auth logged in
// @access Public
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
