"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// using uuid to create unique id for our customers
const { v4: uuidv4 } = require("uuid");


const getAllCompanies = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  //To paginate from server we use skip & limit as query parameters. In case they aren't sent, we default to skip 0 and limit 20.
  let { skip, limit } = req.query;
  skip ? (skip = Number(skip)) : (skip = 0);
  limit ? (limit = Number(limit)) : (limit = 20);

  try {
    await client.connect();
    const companiesList = await db
      .collection("companies")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    client.close();

    if (companiesList.length !== 0) {
      res.status(200).json({ status: 200, data: companiesList });
    } else {
      res.status(404).json({ status: 404, error: err.message });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};


const getAllProducts = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  //To paginate from server we use skip & limit as query parameters. In case they aren't sent, we default to skip 0 and limit 20.
  let { skip, limit } = req.query;
  skip ? (skip = Number(skip)) : (skip = 0);
  limit ? (limit = Number(limit)) : (limit = 20);

  try {
    await client.connect();

    const productsList = await db
      .collection("items")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    await client.close();

    if (productsList.length !== 0) {
      res.status(200).json({ status: 200, data: productsList });
    } else {
      res.status(404).json({ status: 404, error: err.message });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};


const getCompanyById = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  //Transform _id string to number so we can use it to search for company _id
  const _id = Number(req.params._id);

  try {
    await client.connect();
    const companyById = await db.collection("companies").findOne({ _id });

    client.close();

    if (companyById) {
      res.status(200).json({ status: 200, data: companyById });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "The company Id is not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, error: err.message });
  }
};


const getProductById = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  //Transform _id string to number so we can use it to search for product _id
  const _id = Number(req.params._id);

  try {
    await client.connect();
    const productById = await db.collection("items").findOne({ _id });
    client.close();

    if (productById) {
      res.status(200).json({ status: 200, data: productById });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "The product Id is not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};


const getProductsByCategory = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  const category = req.params.category;

  try {
    await client.connect();
    const products = await db
      .collection("items")
      .find({ category: category })
      .toArray();

    client.close();

    if (products) {
      res.status(200).json({ status: 200, data: products });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "The product category is not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};


const addNewPurchase = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  const { email, cart } = req.body;

  //extra validation for purchase
  const expiryM = Number(req.body.expiryM);
  const expiryY = 2000 + Number(req.body.expiryY);
  const creditCardNum = Number(req.body.creditCardNum);
  let today = new Date();
  let expirationDate = new Date();
  expirationDate.setFullYear(expiryY, expiryM, 0);
  
  try {
  
  if (expirationDate < today || typeof creditCardNum !== "number") {

    res.status(420).json({
      status: 420,
      message: "Double check credit card, cannot accept",
    });

  } else {

      await client.connect();
      console.log("connected");

      const customersList = await db.collection("customers").find().toArray();

      const purchaseId = uuidv4();
      const purchases = cart.map((purchase) => {
        return { ...purchase, purchaseId, date: new Date() };
      });
      
      cart.map(async (purchase) => {
        const updateStock = await db.collection("items").updateOne(
          { _id: Number(purchase.product_id) },
          {
            $inc: {
              numInStock: -purchase.quantity,
            },
          }
        );
        
      });

      //check to see if user already exists so we add the purchase info to that user instead of creating a new document in the collection
      if (customersList.filter((e) => e.email === email).length > 0) {
        
        //add the purchase info to the user's array
        await db.collection("customers").updateOne(
            { email: email },
            { $push: { purchaseInfo: { ...cart, purchaseId } } }
          );

        res.status(200).json({ status: 200, data: purchaseId });

      } else {

        //if it's a new user we simple create the new document in Mongo
        const _id = uuidv4();
        const newEntry = await db.collection("customers").insertOne({
          _id: _id,
          ...req.body,
          purchaseInfo: [{ ...purchases }],
        });

        res.status(200).json({ status: 200, data: newEntry.insertedId });
      }
      }
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ status: 500, error: err.message });
    } finally {
      await client.close();
    }
  
};

//Search bar endpoint. Allows text string search in whole collection.
const searchTerm = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  const { searchTerm } = req.query;

  try {
    await client.connect();
    //create a search index
    // db.collection("items").getIndexes("EcommerceItemsIndex");
    db.collection("items").createIndex({
      name: "text",
      category: "text",
      body_location: "text",
    });

    //this is where the magic happens, the $text & $search operator combo is insanely powerful.
    const query = { $text: { $search: searchTerm } };
    const searchResult = await db.collection("items").find(query).toArray();

    if (searchResult.length > 0) {
      res.status(200).json({ status: 200, data: searchResult });
    } else {
      res
        .status(404)
        .json({
          status: 404,
          data: searchResult,
          message: "No results found for your search",
        });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

//Get the unique categories from all the products for the categories menu.
const getCategories = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  try {
    await client.connect();
    console.log("connected!");

    const productsList = await db
      .collection("items")
      .find()
      .project({ category: 1 })
      .toArray();

    await client.close();

    //map through the entire array and get only the unique categories
    let categories = [];
    productsList.map((e) => categories.push(e.category));
    let uniqueArray = categories.filter((e, i, s) => s.indexOf(e) === i);

    if (uniqueArray) {
      res.status(200).json({ status: 200, data: uniqueArray });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "No results found for your search" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};


//This allows us to get the entire item object for the products in the cart to display
const getCartItems = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  
  // we use the array of product id we have in state or storage to find the specific items. 
  // Mongo allows the use of an array to select multiple objects with the $in operator!
  let searchArray = req.body.map (i => Number(i.product_id) )
  try {
    await client.connect();
    const cartItems = await db
      .collection("items")
      .find({ _id: { $in : searchArray } })
      .toArray();

    client.close();

    if (cartItems) {
      res.status(200).json({ status: 200, data: cartItems });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};


module.exports = {
  getAllCompanies,
  getAllProducts,
  getCompanyById,
  getProductById,
  getProductsByCategory,
  addNewPurchase,
  getCategories,
  searchTerm,
  getCartItems
};
