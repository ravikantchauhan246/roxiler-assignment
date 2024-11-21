const axios = require("axios");
const Transaction = require("../model/transactionModel");

const initializeDB = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = await response.data;

    await Transaction.deleteMany();
    await Transaction.insertMany(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Database initialization failed" });
  }
};

const transactions = async (req, res) => {
  const { month = "select", search = "", page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, "i");
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  const query =
    month === "select"
      ? {}
      : {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        };

  console.log(regex, monthNumber, query);

  try {
    const transactions = await Transaction.find(query)
      .limit(Number(perPage))
      .skip((page - 1) * perPage);
    // .sort({dateOfSale:-1});
    const count = await Transaction.countDocuments(query);
    console.log(transactions, count);

    const result = { transactions, count, page, perPage };
    if (!res.headersSent) {
      res.status(200).send(result);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
};

const statistics = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const totalTransactionAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const totalItemsSold = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
      sold: true,
    });

    const totalItemsNotSold = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
      sold: false,
    });

    res.json({
      totalTransactionAmount: totalTransactionAmount[0]
        ? totalTransactionAmount[0].total
        : 0,
      totalItemsSold,
      totalItemsNotSold,
    });
  } catch (error) {
    res.status(500).send("Error in statistics");
  }
};

const barChartData = async (req, res) => {
  const { month } = req.query;

  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const barChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
            Infinity,
          ],
          default: "1000-Above",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    res.json(barChartData);
  } catch (error) {
    res.status(500).send("Error in fetching the data from the database");
  }
};

const pieChartData = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
    ]);

    res.json(pieChartData);
  } catch (error) {
    res.status(500).send("Error in fetching the data from the database");
  }
};

const combinedData = async (req, res) => {
  try {
    const [transactions, statisitcs, barChartData, pieChartData] =
      await Promise.all([
        axios.get("http://localhost:5000/transactions", { params: req.query }),
        axios.get("http://localhost:5000/statistics", { params: req.query }),
        axios.get("http://localhost:5000/barChart", { params: req.query }),
        axios.get("http://localhost:5000/pieChart", { params: req.query }),
      ]);

    res.json({
      transactions: transactions.data,
      statisitcs: statisitcs.data,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
    });
  } catch (error) {
    res.status(500).send("Error in fetching combined data");
  }
};

module.exports = {
  initializeDB,
  transactions,
  statistics,
  barChartData,
  pieChartData,
  combinedData,
};
