const PaymentPlan = require("../models/PaymentPlan.js");
const Subscription = require("../models/Subscription");
const Transaction = require("../models/Transaction");
const fetch = require("node-fetch");
module.exports = {
  //@route            GET /plans/total
  //@description       get user total balance
  //@access            Private
  calculateTotalBalance: async (req, res) => {
    /**we map through all the user's plan and get the amount of each plan and add them together */
    const plans = await PaymentPlan.find({ user: req.user._id });
    if (!plans) {
      return res.status(200).json({
        total: 0,
      });
    }

    const { total } = await convertCurrencies(plans);
    return res.status(200).json({
      total,
    });
  },
  //@route     POST /plans/create
  //@decription  create plan
  //@access      Private
  createPlan: async (req, res) => {
    try {
      let plan;
      const { name, targetAmount, currency } = req.body;
      /**first check if the user already has a plan with this name */
      const alreadyPlan = await PaymentPlan.findOne({
        $and: [{ name: "name" }, { user: req.user._id }],
      });
      if (alreadyPlan) {
        res.status(422).json({ msg: "plan with this name already exists" });
      }
      plan = new PaymentPlan({
        user: req.user._id,
        name: name,
        actualBalance: 0,
        availableBalance: 0,
        targetAmount: targetAmount,
        currency: currency,
      });
      await plan.save();
      res.status(200).json({ plan: plan });
    } catch (error) {
      res.status(500).json({ msg: err.message });
    }
  },

  /**this is for editing our goals e.g name,targetAmount description */
  editPlan: async (req, res) => {
    try {
      //so when editing a plan we update the targetAmount and the description and name
      //then update  using the updateOne method
      //it with the description and targetAmount
      //if updated sucessfully,we send am messsage to the client
      await PaymentPlan.updateOne({ _id: req.params.id }, { ...req.body });
      res.status(200).json({
        msg: "Plan updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
  //@route     GET /payments/id
  //@decription  get single plan
  //@access      Private
  getPlan: async (req, res) => {
    try {
      const plan = await PaymentPlan.findOne({ _id: req.params.id });

      const subscriptions = await Subscription.find({ plan: req.params.id });
      const transactions = await Transaction.find({
        paymentPlan: req.params.id,
      })
        .sort({ createdAt: -1 })
        .limit(5);
      const data = {
        ...plan._doc,
        subscriptions,
        transactions,
      };
      res.status(200).json({
        plan: data,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
  //@route     GET/payments/
  //@decription  get all plans
  //@access      Private
  getAllPlans: async (req, res) => {
    try {
      const plans = await PaymentPlan.find({ user: req.user._id });
      res.status(200).json({
        plans,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
  //@route     DELETE /payments/delete/:id
  //@decription   delete payment plan
  //@access      Private
  deletePlan: async (req, res) => {
    //TODO if the user has active subscriptions tagged to it,should we cancel them or redirect the subscriptions to the wallet
    try {
      const plan = await PaymentPlan.findById({ _id: req.params.id });
      await plan.delete();
      res.status(200).json({
        msg: "plan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        msg: error.msg,
      });
    }
  },

  //@route     GET/plans/list
  //@decription  get plan name list
  //@access      Private
  getPlanNames: async (req, res) => {
    try {
      const plans = await PaymentPlan.find({ user: req.user._id });
      let planList = [];
      plans.map((plan) => {
        planList.push({
          name: plan.name,
          currency: plan.currency,
          id: plan._id,
        });
      });
      res.status(200).json({
        plans: planList,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },

  //@route     GET/plans/dashboard
  //@decription  get plans for dashboard
  //@access      Private
  getDashboardPlans: async (req, res) => {
    try {
      const plans = await PaymentPlan.find({ user: req.user._id }).limit(3);
      res.status(200).json({
        plans,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
  convertCurrency: async (req, res) => {
    let total;
    try {
      const response = await fetch(
        `${process.env.FIXER_URL}?access_key=${process.env.ACCESS_KEY}
      `,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      total = req.body.amount / data.rates[req.body.from];

      total = total * data.rates[req.body.to];
      res.status(200).json({
        total,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
};

const convertCurrencies = async (transactions) => {
  let total = 0;
  try {
    const response = await fetch(
      `${process.env.FIXER_URL}?access_key=${process.env.ACCESS_KEY}
      `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    transactions.map((transaction) => {
      total += transaction.actualBalance / res.rates[transaction.currency];
    });
    total = total * res.rates.UGX;
  } catch (error) {
    console.log(error);
  }
  return {
    total,
  };
};
