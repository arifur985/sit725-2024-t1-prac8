var express = require("express");
var path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var app = express();

const dbUrl = "mongodb+srv://store:1Ra1rVwr65h4YvL0@cluster0.fcgmcp8.mongodb.net/firstDatabase";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect(dbUrl, connectionParams).then(() => {
  console.info("Connected to the DB");
})
  .catch((e) => {
    console.log("Error:", e);
  });

app.use(express.static(path.join(__dirname, 'pages')));

app.use('/layout', express.static(path.join(__dirname, 'layout')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const formSchema = new mongoose.Schema({
  email: String,
}, { timestamps: true });

const FormData = mongoose.model('FormData', formSchema);

app.use(express.static(path.join(__dirname, 'pages')));

app.use('/layout', express.static(path.join(__dirname, 'layout')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', async (req, res) => {
  try {
    const formData = new FormData({
      email: req.body.email,
    });
    await formData.save();
    console.log("Form data saved to database:", req.body);
    res.status(200).send("Form data submitted successfully!");
  } catch (e) {
    console.error("Failed to save form data:", e);
    res.status(500).send("Failed to submit form data.");
  }
});


app.get('/api/form-data', async (req, res) => {
  try {
    const data = await FormData.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error("Error retrieving data from database:", err);
    res.status(500).send("Error retrieving data from database.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
