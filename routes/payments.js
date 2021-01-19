const express = require("express");
const router = express.Router();
const passport = require("passport");

//import Controllers
const {
  makePayment,
  cancelSubscription,
  activateSubscription,
  scheduleSubscription,
  updateUserSubscription,
  getPaymentPlan,
  updateSubscriptionFromFlutterwave,
} = require("../controllers/paymentsController.js");

//@route     POST /payments/makePayment
//@decription  create  and update onetime payment user
//@access      Private
router.post(
  "/makePayment",
  passport.authenticate("jwt", { session: false }),
  makePayment
);

//@route        Post /payments/schedulePayment
//@description    schedule new subscription
//@access        Private
router.post(
  "/schedulePayment",
  passport.authenticate("jwt", { session: false }),
  scheduleSubscription
);
//@route        Post /payments/activateSubscription/:id
//@description    activate a cancelled subscription
//@access        Private
router.put(
  "/activateSubscription/:id",
  passport.authenticate("jwt", { session: false }),
  activateSubscription
);
//@route        Post /payments/cancelSubscription/:id
//@description    cancel subscription
//@access        Private
router.put(
  "/cancelSubscription/:id",
  passport.authenticate("jwt", { session: false }),
  cancelSubscription
);

//@route        Post /payments/updateSubscription
//@description    update  subscription
//@access        Private
//!Note this has to be post not put or patch because it is a webhook
router.post("/updateSubscription", updateSubscriptionFromFlutterwave);

//@route        Post /payments/updateUserSubscription
//@description    update  subscription
//@access        Private
router.put("/updateUserSubscription/:id", updateUserSubscription);

router.post(
  "/getPaymentPlan",
  passport.authenticate("jwt", { session: false }),
  getPaymentPlan
);

module.exports = router;
