const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'pages' directory
app.use(express.static(path.join(__dirname, 'pages')));

// Serve static files from the 'layout' directory
app.use('/layout', express.static(path.join(__dirname, 'layout')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
  {
    title: "Kitten 1",
    image: "layout/images/product1.jpg",
    link: "About Kitten 1",
    description: "Demo description about kitten 1"
  },
  {
    title: "Kitten 2",
    image: "layout/images/product2.jpg",
    link: "About Kitten 2",
    description: "Demo description about kitten 2"
  },
  {
    title: "Kitten 3",
    image: "layout/images/product3.jpg",
    link: "About Kitten 3",
    description: "Demo description about kitten 3"
  }
];

app.get('/api/projects', (req, res) => {
  res.json({ statusCode: 200, data: cardList, message: "Success" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
