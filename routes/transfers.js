const express = require("express");
const router = express.Router();
const { auth } = require("../middleware");

const {
  mobilePayment,
  bankPayment,
  accountTransfer,
  updateTranfer,
  addBankAcct,
  addNumber,
} = require("../controllers/transfersController");
//import Controllers

router.post("/mobile", auth, mobilePayment);
router.post("/bank", auth, bankPayment);

router.post("/account", auth, accountTransfer);
router.post("/addNumber", auth, addNumber);
router.post("/addBankAcct", auth, addBankAcct);

module.exports = router;
