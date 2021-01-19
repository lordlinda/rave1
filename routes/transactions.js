const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTransactions,
  getTransaction,
  getDashboardTransactions,
} = require("../controllers/transactionsController.js");

//@route     POST /transactions
//@decription  get transactions based on the parametes
//@access      Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  getTransactions
);

//@route     POST /transactions
//@decription  get transactions based for the dashboard
//@access      Private
router.get(
  "/dash/transactions",
  passport.authenticate("jwt", { session: false }),
  getDashboardTransactions
);

//@route     GET /transactions
//@decription  get transaction
//@access      Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getTransaction
);
module.exports = router;
