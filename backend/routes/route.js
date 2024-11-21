const router = require("express").Router();

const {
  initializeDB,
  transactions,
  statistics,
  pieChartData,
  barChartData,
  combinedData,
} = require("../controller/transaction");

// To test the connection
router.get('/' , (req, res) => {
    res.send('Hello World')
    });

router.get("/initialize", initializeDB);
router.get("/transactions", transactions);
router.get("/statistics", statistics);
router.get("/piechart", pieChartData);
router.get("/barchart", barChartData);
router.get("/combined", combinedData);


module.exports = router;
