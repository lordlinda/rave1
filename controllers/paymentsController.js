const unirest = require('unirest');
const moment = require('moment')
var request = require('request');

const PaymentPlan = require('../models/PaymentPlan.js')
const Transaction = require('../models/Transaction')

const { createTransaction } = require('./transactionsController.js')
module.exports = {
  //@route     POST /payments/create
  //@decription  create plan
  //@access      Private
  createPlan: (req, res) => {
    /**pick data from the client and create  a new plan */
    const { name, targetAmount, description } = req.body
    const newPaymentPlan = new PaymentPlan({
      user: req.user._id,
      description: description,
      name: name,
      amount: 0,
      targetAmount: targetAmount,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm"),
    })

    newPaymentPlan.save()
      .then(plan => {
        /**if the plan is created successfully,we return the plan to the client */
        res.status(200).json({ plan: plan })
      }).catch(err => {
        res.status(500).json({ msg: err.message })
      })
  },



  //@route     POST /payments/makePayment
  //@decription  create  and update onetime payment user
  //@access      Private
  makePayment: (req, res) => {
    //console.log(req.body)
    //create payload to verify payment
    var payload = {
      SECKEY: process.env.SECRET,
      flw_ref: req.body.response.tx.flwRef
    };

    //console.log(payload)

    //make sure to change this to live verify url in production
    var server_url = "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com/flwv3-pug/getpaidx/api/verify";
    //make a post request to the rave server to verify this payment
    unirest
      .post(server_url)
      .headers({ "Content-Type": "application/json" })
      .send(payload)
      .end(function (response) {
        /**1.Confirm payment from flutterwave */
        if (response.body.status === "success" && response.body.data.flwMeta.chargeResponse === '00' && response.body.data.amount == req.body.response.tx.amount) {
          //check if the amount is same as amount you wanted to charge just to be very sure
          console.log('Payment sucessful')
          /**2.Check if the user already has a payment plan */
          return PaymentPlan.findOne({ user: req.user._id })
            .then(plan => {
              if (plan) {
                /**3.Which plan does the user want to update */
                if (req.body.id) {
                  /**3.1 we update the plan the user if it has been identified */
                  //the id of plan comes from the body
                  PaymentPlan.updateOne({ _id: req.body.id }, { $inc: { amount: response.body.data.amount } }, { new: true })
                    .then(plan => {
                      //3.1.1 create a new transaction object
                      createTransaction(req.body.response, req.body.id, req.user._id, res)
                    }).catch(err => {
                      /** 3.2.1 we inform the user that the plan was not updated */
                      res.status(500).json({
                        error: err.message
                      })
                    })
                } else {
                  /**if user has not specified id we update the checking account amount
                   * the plan is null to show it is the checking account
                   */
                  updateCheckingAccountAmount(response.body.data.amount, req.body.response, null, req.user._id, res)
                }
              } else {
                /**3.2 user has no plan and we create them a checking account */
                newUserCheckingAccount(response.body.data.amount, req.body.response, req.user._id, res)

              }
            })

        }
        /**this is a malicious payment */
        res.status(422).json({
          error: 'Wrong url or malicious payment'
        })


      })

  },


  //@route        GET /payments/makeSubscription
  //@description  get  create new subscription
  //@access        Public
  makeSubscription: (req, res) => {
    //console.log(req.body)
    var payload = {
      SECKEY: process.env.SECRET,
      flw_ref: req.body.response.tx.flwRef
    }
    //make sure to change this to live verify url in production
    var server_url = "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com/flwv3-pug/getpaidx/api/verify";
    //please make sure to change this to production url when you go live
    /**Confrim if this is a true payment from flutterwave */
    unirest
      .post(server_url)
      .headers({ "Content-Type": "application/json" })
      .send(payload)
      .end(function (response) {
        console.log(response)
        /**1.Confirm is this is a valid payment from flutterwave */
        //check status is success.
        if (response.body.status === "success" && response.body.data.flwMeta.chargeResponse === '00' && response.body.data.amount == req.body.response.tx.amount) {
          console.log('Subscription sucessful')
          /**2.Check if the user has a plan with us */
          return PaymentPlan.findOne({ user: req.user._id })
            .then(plan => {
              if (plan) {
                /**3.if they have a plan,check if they want to subscribe to a particular plan */
                if (req.body.id) {
                  /** 3.1 making a subscription to a particular plan */
                  return PaymentPlan.updateOne({ _id: req.body.id },
                    {
                      $inc: { amount: response.body.data.amount },
                      customerId: req.body.response.tx.txRef,
                      planId: req.body.response.tx.paymentPlan,
                      currency: req.body.response.tx.currency,
                      installment: response.body.data.amount,
                      status: 'Active',
                    },
                    { new: true })
                    .then(plan => {

                      /**create transaction */
                      createTransaction(req.body.response, req.body.id, req.user._id, res)

                    })
                } else {
                  /** 3.2 Subscribe to checking account this has no id and will return undefined when u create a transaction so i switch it to null*/
                  updateCheckingAccountAmount(response.body.data.amount, req.body.response, null, req.user._id, res)

                }
              } else {
                /**3.Create a  subscribed plan for user */
                newUserCreateCheckingAccount(response.body.data.amount, req.body.response, req.user._id, res)

              }

            }).catch(err => {
              console.log(err)
              res.status(500).json({
                error: err.message
              })
            })
        }
        /**Malicious payment */
        res.status(422).json({
          msg: 'Sorry,payment failed.Please try again'
        })

      })

  },
  //@route        Post /payments/cancelSubscription/:id
  //@description    cancel subscription
  //@access        Private
  cancelSubscription: (req, res) => {
    const id = req.params.id
    const { plan } = req.body
    /**pick the plan we want to cancel from flutterwave */
    var server_url = `https://ravesandboxapi.flutterwave.com/v3/subscriptions?plan=${plan}&${req.user.email}&status=active`;
    //we are getting so we use the get request
    //seckey is stored as Authoristion header,it is required or the route wont work
    unirest
      .get(server_url)
      .headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SECRET}`
      })
      .end(function (response) {
        console.log(response.body.data)
        //the response will basically  be an array ,so we map to find that customer id matching the one stored
        //in our payment schema.
        //console.log(response.body.data.filter(customer=>customer.amount == '50000')[0])
        PaymentPlan.findOne({ _id: id })
          .then(plan => {
            //we find the subscriptions from rave and  pick the one created at the same time  with the plan we want to cancel to the minute detail since the 
            //seconds vary by a few 
            //and we do thsi with the help of moment
            const subscription = response.body.data.filter(customer =>
              moment(customer.created_at).format('YYYY-MM-DD HH') == moment(plan.createdAt).format('YYYY-MM-DD HH') && customer.customer.customer_email == req.user.email)[0]
            if (subscription) {
              //this is how the response will look like
              /*[{ id: 6590, amount: 100, customer: { id: 451687, customer_email: 'user@example.com' },plan: 6847,status: 'active',created_at: '2020-08-28T07:35:16.000Z'
               }]*/
              //then we pick the id and cancel the subscription
              //make sure to change this url to the production url
              var server_url = `https://ravesandboxapi.flutterwave.com/v3/subscriptions/${subscription.id}/cancel`;
              unirest
                .put(server_url)
                //in this case the secret key is in the auth header
                .headers({
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${process.env.SECRET}`
                })
                .end(function (response) {
                  //console.log(response.body.data)
                  /*  raw_body: '{"status":"success","message":"Subscription cancelled",
                  "data":{"id":6590,"amount":100,"customer":{"id":451687,"customer_email":"user@example.com"},
                  "plan":6847,"status":"cancelled","created_at":"2020-08-28T07:35:16.000Z"}}'*/
                  //after cancelling the  plan we set its status to inactive
                  deactivateSubscription(id, res)

                })//end of rave server response
            } else {
              res.status(400).json({
                msg: 'Sorry subscription not cancelled'
              })
            }
          }).catch(err => {
            res.status(404).json({
              msg: 'Sorry subscription not found'
            })
          })

      })//end of finding subscriptions


  },
  updateSubscription: (req, res) => {
    // retrieve the signature from the header
    var hash = req.headers["verif-hash"];
    //console.log(hash)
    if (!hash) {
      console.log('not from flutterwave')
      return res.status(422).json({ msg: 'not from flutterwave' })
    }

    if (hash !== process.env.MY_HASH) {
      return res.status(422).json({ msg: 'not my hash' })
    }
    //so in this route we want to update the users amount who has a subscription with us
    //every time the subscription is completed
    //so we get back an object like this
    /*{"event":"charge.completed","data":{"id":1500929,"tx_ref":"Sun Aug 30 2020 17:20:28 GMT+0300 (East Africa Time)",
    "flw_ref":"FLW-MOCK-SUB-2e92ee0e22700c8b9ed3cb292aa6b572","device_fingerprint":"b5fa803ac0c440b2f94844016749f098",
    "amount":50000,"currency":"UGX","charged_amount":50000,"app_fee":1900,"merchant_fee":0,"processor_response":"Approved",
    "auth_model":"noauth","ip":"41.210.159.83",
    "narration":"Charge for Hourly Savings","status":"successful","payment_type":"card",
    "created_at":"2020-08-30T15:22:19.000Z","account_id":170656,"customer":{"id":452895,
    "name":"anna Doxa grace","phone_number":"234099940409","email":"annaphaneroo@gmail.com",
    "created_at":"2020-08-30T14:22:14.000Z"},"card":{"first_6digits":"506146","last_4digits":"3210",
    "issuer":"MAESTRO  DEBIT","country":"NG","type":"MAESTRO","expiry":"12/21"}},"event.type":"CARD_TRANSACTION"}*/
    //so to update the user we  find the user that belongs to this account
    //we check if the event is charge.completed
    //update the amount with the amount

    console.log(req.body)
    if (req.body.event == 'charge.completed' && req.body.data.narration === 'Charge for Hourly Savings' || 'Charge for Daily Savings' || 'Charge for Monthly Savings' || 'Charge for Weekly Savings' || 'Charge for Yearly Savings') {
      const customer = req.body.data.customer.id
      const amount = req.body.data.amount
      console.log(customer, amount)
      return PaymentPlan
        .findOne({ $and: [{ customerId: { $in: [customer, req.body.data.tx_ref] } }, { installment: amount }] })
        .then(plan => {
          const Plan = plan
          if (plan) {
            return PaymentPlan.updateOne({ _id: plan._id }, { $inc: { amount: amount } }, { new: true })
              .then(plan => {
                //we create a transaction for every subscription that is paid successfully
                //we save this transaction to our database and  return a sucess message to our client
                const newTransaction = new Transaction({
                  transactionId: req.body.data.id,
                  amount: req.body.data.amount,
                  paymentMethod: req.body.data.payment_type,
                  currency: req.body.data.currency,
                  date: moment(Date.now()).format("YYYY-MM-DD HH:mm"),
                  paymentPlan: Plan._id,
                  user: Plan.user
                })

                newTransaction.save()
                  .then(transaction => {
                    res.status(200).json({
                      msg: 'Payment plan updated',
                      message: 'Transaction history registered'
                    })
                  })
                console.log('transaction saved')

              }).catch(err => {
                //if we fail to update the payment ,then we must show an error to the client
                res.status(500).json({ error: err.message })
              })
          }
          return res.status(422).json({ msg: 'updated plan not found' })
        })

    }//end of if statement
    return res.status(422).json({ msg: 'This is not a subscription payment' })
  },
  editPlan: (req, res) => {
    //so when editing a plan we update the targetAmount and the description and name
    const id = req.params.id
    const { name, targetAmount, description } = req.body
    planisCheckingAccount(id, res)
    //we first find the payment plan using the id
    //then update  using the updateOne method
    //it with the description and targetAmount
    //if updated sucessfully,we send am messsage to the client
    //otherwise we send and array
    PaymentPlan.updateOne({ _id: id }, { name: name, targetAmount: targetAmount, description: description }, { new: true })
      .then(plan => {
        res.status(200).json({
          msg: 'Updated sucessfully'
        })
      }).catch(err => {
        res.status(400).json({
          msg: 'plan not updated'
        })
      })
  },
  //@route     GET /payments/id
  //@decription  get single plan
  //@access      Private
  getPlan: (req, res) => {
    PaymentPlan.findOne({ _id: req.params.id })
      .then(plan => {
        res.status(200).json({
          plan: plan
        })
      }).catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  },
  //@route     GET/payments/
  //@decription  get all plans
  //@access      Private
  getAllPlans: (req, res) => {
    /**select all payment plans where the user is either the id or email address */
    PaymentPlan.find({ $or: [{ user: req.user._id }, { email: req.user.email }] })
      .then(plans => {
        res.status(200).json({
          plans: plans
        })
      }).catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  },


}
/**not exported functions */
const newUserCheckingAccount = (amount, response, user, res) => {
  const newPaymentPlan = new PaymentPlan({
    name: 'Checking Account',
    planId: response.tx.paymentPlan,
    customerId: response.tx.txRef,
    user: user,
    amount: amount,
    currency: response.tx.currency,
    installment: response.tx.paymentPlan ? amount : 0,
    status: response.tx.paymentPlan ? 'Active' : 'Inactive',
    createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm")
  })
  /**Save checking account to database */
  newPaymentPlan.save()
    .then(plan => {
      /**create transaction */
      createTransaction(response, plan, user, res)
    }).catch(err => {
      res.status(500).json({
        error: err.message
      })
    })
}

const updateCheckingAccountAmount = (amount, response, Plan, user, res) => {
  PaymentPlan.updateOne({ $and: [{ name: 'Checking Account' }, { user: user }] },
    {
      $inc: { amount: amount },
      planId: response.tx.paymentPlan,
      customerId: response.tx.txRef,
      installment: response.tx.paymentPlan ? amount : 0,
      status: response.tx.paymentPlan ? 'Active' : 'Inactive',
    }, { new: true })
    .then(plan => {
      //we store in our user history as transcation
      //for each payment we create a new transaction object
      //we save this transaction to our database and  return a sucess message to our client
      createTransaction(response, Plan, user, res)
    }).catch(err => {
      //if we fail to update the payment ,then we must show an error to the client
      res.status(500).json({
        error: err.message
      })
    })
}

const deactivateSubscription = (id, res) => {
  PaymentPlan.updateOne({ _id: id }, { $set: { status: 'Inactive', planId: '', customerId: '', installment: 0 } })
    .then(plan => {
      res.status(200).json({
        msg: 'Plan subscription deactivated'
      })
    }).catch(err => {
      res.status(500).json({
        msg: err.message
      })
    })

}
const planisCheckingAccount = (id, res) => {
  PaymentPlan.find({ _id: id })
    .then(plan => {
      if (plan.name == 'Checking Account') {
        return res.status(422).json({
          msg: "Sorry can/'t update checking account "
        })
      }

    })

}


