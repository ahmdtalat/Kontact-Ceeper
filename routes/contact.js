const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const User = require('../models/User');

// @route Get api/contacts
// @desc Get all user contact
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route Post api/contacts
// @desc Add new contact
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json('Server Error');
    }
  }
);

// @route PUT api/contacts/:id
// @desc update contact
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route Delete api/contacts/:id
// @desc delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Add contact');
});

module.exports = router;
