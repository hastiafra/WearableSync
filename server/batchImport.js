const {MongoClient} = require('mongodb');

require('dotenv').config();
const {MONGO_URI} = process.env;
const fs = require('file-system');

const items = require("./data/items.json")
const companies = require("./data/companies.json")

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const batchImport = async () => {
    try {
        
        // creates a new client
        const client = new MongoClient(MONGO_URI, options);
    
        // connect to the client
        await client.connect();
    
        // connect to the database 
        const db = client.db('Ecommerce');
        console.log("connected!");
        
        // add items and company data
        await db.collection("items").insertMany(items);
        await db.collection("companies").insertMany(companies);
        
        console.log('Successfully added items and companies');
        
        client.close();
        
        
    }

    catch (err) {
        console.log("Shit hit the fan - " + err.message);
    }
    
};

batchImport();
