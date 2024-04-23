const connect = require('../dbConnection');

async function insertCat(cat) {
    const db = await connect();
    const collection = db.collection('Cats');
    return collection.insertOne(cat);
}

async function getAllCats() {
    const db = await connect();
    const collection = db.collection('Cats');
    return collection.find().toArray();
}

module.exports = { insertCat, getAllCats };
