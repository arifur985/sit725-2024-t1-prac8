const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Use environment variables for sensitive data
// Database Connection
const uri = "mongodb+srv://store:aVRaKV2e7JDhu86q@cluster0.fcgmcp8.mongodb.net/firstDatabase"; // Set your MongoDB URI here
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});
let collection;

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/layout', express.static(path.join(__dirname, 'layout')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db('firstDatabase').collection('cards');
    console.log("Database connected successfully");
  } catch (ex) {
    console.error("Error connecting to the database:", ex);
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await collection.find({}).toArray();
    res.status(200).json({ statusCode: 200, message: "Success", data: result });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Internal Server Error", error: err });
  }
});

app.post("/api/products", async (req, res) => {
    if (!req.body.title || !req.body.image || !req.body.description) {
        return res.status(400).json({ statusCode: 400, message: "Bad Request: Missing title, image, or description." });
    }
    try {
        const result = await collection.insertOne(req.body);
        res.status(201).json({ statusCode: 201, message: "Car added successfully", data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: "Internal Server Error", error: err });
    }
});

app.listen(port, () => {
  console.log(`Express server started on port ${port}`); // Changed to use backticks for template literal
  runDBConnection();
});
