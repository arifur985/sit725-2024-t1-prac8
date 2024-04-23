const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://store:aVRaKV2e7JDhu86q@cluster0.fcgmcp8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("your-database-name"); // Add your database name here
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

module.exports = connect;
