const express = require("express");
const router = express.Router();
const passport = require("passport");

//import Controllers
const {
  getSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionsController");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getSubscription
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteSubscription
);
module.exports = router;
