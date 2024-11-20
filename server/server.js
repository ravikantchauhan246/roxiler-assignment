require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/route.js");
const cors = require("cors");
const app = express();


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
