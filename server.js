const express = require('express');
const connectDB = require('./config/db');
const app = express();

const PORT = 3000;

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the contact keeper api.' });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contact'));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
