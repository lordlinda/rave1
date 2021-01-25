const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  mobilePayment,
  bankPayment,
  accountTransfer,
  updateTranfer,
  addBankAcct,
  addNumber,
} = require("../controllers/transfersController");
//import Controllers

router.post(
  "/mobile",
  passport.authenticate("jwt", { session: false }),
  mobilePayment
);
router.post(
  "/bank",
  passport.authenticate("jwt", { session: false }),
  bankPayment
);

router.post("/updateTransfer", updateTranfer);

router.post(
  "/account",
  passport.authenticate("jwt", { session: false }),
  accountTransfer
);
router.post(
  "/addNumber",
  passport.authenticate("jwt", { session: false }),
  addNumber
);
router.post(
  "/addBankAcct",
  passport.authenticate("jwt", { session: false }),
  addBankAcct
);

module.exports = router;
