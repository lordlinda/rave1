const express = require("express");
const router = express.Router();
const passport = require("passport");

//import Controllers
const {
  deletePlan,
  editPlan,
  getPlan,
  createPlan,
  getAllPlans,
  calculateTotalBalance,
  getDashboardPlans,
  convertCurrency,
} = require("../controllers/plansController");

//@route            GET /plans/total
//@description       get user total balance
//@access            Private
router.get(
  "/total",
  passport.authenticate("jwt", { session: false }),
  calculateTotalBalance
);

//@route     POST /plans/create
//@decription  create a plan
//@access      Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPlan
);

//@route        DELETE /plans/deletePlan/:id
//@description    delete payment plan
//@access        Private
router.delete(
  "/deletePlan/:id",
  passport.authenticate("jwt", { session: false }),
  deletePlan
);

//@route        Put /plans/editplan/:id
//@description    update  payment plan
//@access        Private
router.put(
  "/editplan/:id",
  passport.authenticate("jwt", { session: false }),
  editPlan
);

//@route        Get /plans/:id
//@description    get payment plan
//@access        Private
router.get("/:id", passport.authenticate("jwt", { session: false }), getPlan);

//@route        Get /plans/
//@description    get payment plans
//@access        Private
router.get("/", passport.authenticate("jwt", { session: false }), getAllPlans);

router.post(
  "/convert",
  passport.authenticate("jwt", { session: false }),
  convertCurrency
);
//@route        Get /plans/dashboard
//@description    get plans to display on dashbaord
//@access        Private
router.get(
  "/plans/dashboard",
  passport.authenticate("jwt", { session: false }),
  getDashboardPlans
);

module.exports = router;
