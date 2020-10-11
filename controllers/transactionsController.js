const moment = require('moment')
const Transaction = require('../models/Transaction.js')
module.exports = {
  //@route     POST /transactions
  //@decription  get transactions based on the parametes
  //@access      Private
  getTransactions: (req, res) => {
    console.log(req.body)
    const { limit, to } = req.body
    //in the front end we want to be able to show a few  transactions on the home page
    //but all of them in the transactions page()
    //note limit should be numeric and not a string
    Limit = limit ? limit : 0

    let findArgs = {}
    if (req.body) {
      if (req.body.startDate || req.body.endDate) {
        //we want findArgs to look like this {date:{$gte:'2020-09-09',$lt:'2020-09-10'}}
        findArgs['date'] = {
          $gte: req.body.startDate ? (moment(req.body.startDate)).format('YYYY-MM-DD HH:mm') : '1970-01-01',
          $lt: req.body.endDate ? (moment(req.body.endDate).format('YYYY-MM-DD HH:mm')) : '4040-10-11',
        }
      }

      if (req.body.paymentMethod) {
        findArgs['paymentMethod'] = req.body['paymentMethod']
      }
      if (req.body.currency) {
        findArgs['currency'] = req.body['currency']
      }
      //i did this because limit interferes with the search parameters
    }

    console.log(findArgs)
    Transaction.find({ user: req.user._id, ...findArgs })
      .limit(Limit)
      //we want to have the latest payments on top so we sort the date in descending order starting from the beginning
      .sort({ date: -1 })
      .populate('paymentPlan', 'name')
      .then(transactions => {
        res.status(200).json({
          transactions: transactions
        })
      }).catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })


  },
  //@route     GET /transactions
  //@decription  get transaction
  //@access      Private
  getTransaction: (req, res) => {
    Transaction.findOne({ _id: req.params.id })
      .populate('paymentPlan', 'name')
      .then(transaction => {
        res.status(200).json({
          transaction: transaction
        })
      }).catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  },
  /**create a transaction */
  createTransaction: (response, plan, user, res) => {
    console.log('plan', plan)
    const newTransaction = new Transaction({
      transactionId: response.tx.id,
      amount: response.tx.amount,
      paymentMethod: response.tx.paymentType,
      currency: response.tx.currency,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm"),
      paymentPlan: plan,
      user: user
    })
    newTransaction.save()
      .then(transaction => {
        res.status(200).json({
          msg: 'Payment plan updated',
          message: 'Transaction history registered'
        })
      })
  },
}