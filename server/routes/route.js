const express = require("express");
const Transaction = require("../model/database");

const router = express.Router();

router.get("/initialize-data", async (req, res) => {
  const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
  const data = await response.json();
  console.log("Hello world");
  await Transaction.insertMany(data);

  res.json(data);
});

// Test route to verify if the router is working
router.get("/test", (req, res) => {
  res.send("Router is working");
});

module.exports = router;