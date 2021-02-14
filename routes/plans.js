const express = require("express");
const router = express.Router();
const { auth } = require("../middleware");
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
  getPlanNames,
} = require("../controllers/plansController");

//@route            GET /plans/total
//@description       get user total balance
//@access            Private
router.get("/total", auth, calculateTotalBalance);

//@route     POST /plans/create
//@decription  create a plan
//@access      Private
router.post("/create", auth, createPlan);

//@route        DELETE /plans/deletePlan/:id
//@description    delete payment plan
//@access        Private
router.delete("/deletePlan/:id", auth, deletePlan);

//@route        Put /plans/editplan/:id
//@description    update  payment plan
//@access        Private
router.put("/editplan/:id", auth, editPlan);

//@route        Get /plans/:id
//@description    get payment plan
//@access        Private
router.get("/:id", auth, getPlan);

//@route        Get /plans/
//@description    get payment plans
//@access        Private
router.get("/", auth, getAllPlans);

//@route     GET/plans/list
//@decription  get plan name list
//@access      Private
router.get("/plans/list", auth, getPlanNames);

router.post("/convert", auth, convertCurrency);
//@route        Get /plans/plans/dashboard
//@description    get plans to display on dashbaord
//@access        Private
router.get("/plans/dashboard", auth, getDashboardPlans);

module.exports = router;
