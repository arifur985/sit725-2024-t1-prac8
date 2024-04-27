const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://store:aVRaKV2e7JDhu86q@cluster0.fcgmcp8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// Create a function to ensure the client is connected
async function getClient() {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client;
}

module.exports = { getClient };
