const moment = require("moment");
const Transaction = require("../models/Transaction.js");

module.exports = {
  //@route     POST /transactions
  //@decription  get transactions based on the parametes
  //@access      Private
  getTransactions: (req, res) => {
    const { limit, to } = req.body;
    //in the front end we want to be able to show a few  transactions on the home page
    //but all of them in the transactions page()
    //note limit should be numeric and not a string
    Limit = limit ? limit : 0;

    let findArgs = {};
    if (req.body) {
      if (req.body.startDate || req.body.endDate) {
        //we want findArgs to look like this {date:{$gte:'2020-09-09',$lt:'2020-09-10'}}
        findArgs["createdAt"] = {
          $gte: req.body.startDate
            ? moment(req.body.startDate).format("DD MMMM YYYY HH:mm")
            : "1970-01-01",
          $lt: req.body.endDate
            ? moment(req.body.endDate).format("DD MMMM YYYY HH:mm")
            : "4040-10-11",
        };
      }

      if (req.body.paymentMethod) {
        findArgs["pymnt_Mthd"] = req.body["paymentMethod"];
      }
      if (req.body.currency) {
        findArgs["currency"] = req.body["currency"];
      }
      //i did this because limit interferes with the search parameters
    }

    console.log(findArgs);
    Transaction.find({ user: req.user._id, ...findArgs })
      .limit(Limit)
      //we want to have the latest payments on top so we sort the date in descending order starting from the beginning
      .sort({ createdAt: -1 })
      .populate("paymentPlan", "name")
      .then((transactions) => {
        res.status(200).json({
          transactions: transactions,
        });
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  },
  //@route     GET /transactions/:id
  //@decription  get transaction
  //@access      Private
  getTransaction: (req, res) => {
    Transaction.findOne({ _id: req.params.id })
      .populate("paymentPlan", "name")
      .then((transaction) => {
        res.status(200).json({
          transaction: transaction,
        });
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  },

  /**get dashbaord transactions */
  getDashboardTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate("paymentPlan", "name");
      res.status(200).json({
        transactions,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
};
