const express = require("express");
const router = express.Router();
const { auth } = require("../middleware");

const {
  getTransactions,
  getTransaction,
  getDashboardTransactions,
} = require("../controllers/transactionsController.js");

//@route     POST /transactions
//@decription  get transactions based on the parametes
//@access      Private
router.post("/", auth, getTransactions);

//@route     POST /transactions
//@decription  get transactions based for the dashboard
//@access      Private
router.get("/dash/transactions", auth, getDashboardTransactions);

//@route     GET /transactions
//@decription  get transaction
//@access      Private
router.get("/:id", auth, getTransaction);
module.exports = router;
