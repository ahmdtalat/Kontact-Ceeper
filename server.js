const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the contact keeper api.' });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contact'));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
