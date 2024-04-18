let client = require('../dbConnection');
let collection = client.db().collection('Cats');

async function insertCat(cat){
    return collection.insertOne(cat);
}

async function getAllCats(){
    return collection.find().toArray();
}

module.exports = {insertCat, getAllCats}