const { getClient } = require('../dbConnection'); // Make sure this path is correct and the function is properly exported from dbConnection

async function getCollection() {
    const client = await getClient(); // This assumes getClient ensures a connected client
    return client.db().collection('Cats');
}

async function insertCat(cat) {
    const collection = await getCollection();
    return collection.insertOne(cat);
}

async function getAllCats() {
    const collection = await getCollection();
    return collection.find().toArray();
}

module.exports = { insertCat, getAllCats };
