const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set up static files
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/layout', express.static(path.join(__dirname, 'layout')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.post('/submit', (req, res) => {
  // Process form submission
  res.send('Form submitted successfully!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});