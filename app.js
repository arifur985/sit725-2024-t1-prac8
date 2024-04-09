const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'pages' directory
app.use(express.static(path.join(__dirname, 'pages')));

// Serve static files from the 'layout' directory
app.use('/layout', express.static(path.join(__dirname, 'layout')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});
