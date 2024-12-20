require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const route = require("./routes/route");

const app = express();

connectDB();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://roxiler-ravikant.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use("/", route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

