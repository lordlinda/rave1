const express = require("express");
const router = express.Router();
const { auth } = require("../middleware");

//import Controllers
const {
  getSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionsController");

router.get("/:id", auth, getSubscription);

router.delete("/:id", auth, deleteSubscription);
module.exports = router;
