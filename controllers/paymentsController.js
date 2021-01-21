const moment = require("moment");
const fetch = require("node-fetch");
const PaymentPlan = require("../models/PaymentPlan.js");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");
var cron = require("node-cron");
const Subscription = require("../models/Subscription");

module.exports = {
  //@route     POST /payments/makePayment
  //@decription  create  and update onetime payment user
  //@access      Private
  makePayment: async (req, res) => {
    console.log(req.body);
    try {
      //!dont forget to verify the VERIFY_URL
      const { isVerified } = await verifyTransaction({
        flwRef: req.body.flwRef,
        amount: req.body.amount,
      });
      /**if the transaction is not verified we return an error */
      if (!isVerified) {
        return res.status(422).json({
          error: "Wrong url or malicious payment",
        });
      }
      /**2.Check if the user already has a payment plan
       * by querying the payment plan collection for plans by the user
       */
      const planCount = await PaymentPlan.find({
        user: req.user._id,
      }).countDocuments();
      /**if they dont have, their planCount will be zero */
      //! ACID NEEDED HERE
      if (planCount === 0) {
        /**create  a wallet for user */
        const { createdWallet } = await createWallet({
          user: req.user._id,
          currency: req.body.currency,
        });
        /**and add the amount to the wallet */
        /**create a transaction for the payment */
        /**return a successful response */
        const {
          isSuccess,
          transaction,
        } = await updateAmountAndCreateTransaction({
          user: req.user._id,
          id: createdWallet._id,
          amount: req.body.amount,
          paymentType: req.body.paymentType,
          currency: req.body.currency,
        });
        if (!isSuccess) {
          return res.status(500).json({
            msg: "transaction failed,please try again",
          });
        }
        return res.status(201).json({
          transaction,
          msg: "Payment successful",
        });
      }
      /**if the user already has a plan with us,the next step is to find out which plan to update */
      /**if the user hasnt passed in an id ,we update the amount in the user wallet */
      if (!req.body.id) {
        /**if the user didnt choose which plan we update their wallet */
        const Wallet = await PaymentPlan.findOne({
          $and: [{ name: "Wallet" }, { user: req.user._id }],
        });
        console.log(Wallet);
        /**if this is the user's first payment ,the amount is zero and therefore we update the currency */
        if (Wallet.amount === 0) {
          await Wallet.updateOne({ currency: req.body.currency });
        }
        if (Wallet) {
          const {
            isSuccess,
            transaction,
          } = await updateAmountAndCreateTransaction({
            user: req.user._id,
            id: Wallet._id,
            amount: req.body.amount,
            paymentType: req.body.paymentType,
            currency: req.body.currency,
          });
          return res.status(201).json({
            transaction,
            msg: "Payment successful",
          });
        }
      }
      /**we need to check the amount and update the currency */
      const plan = await PaymentPlan.findById(req.body.id);
      if (plan.amount === 0) {
        await plan.updateOne({ currency: req.body.currency });
      }
      /**we update the plan the user has specified by id */
      const { isSuccess, transaction } = await updateAmountAndCreateTransaction(
        {
          user: req.user._id,
          id: req.body.id,
          amount: req.body.amount,
          paymentType: req.body.paymentType,
          currency: req.body.currency,
        }
      );
      /**if the mongodb transaction fails we dont , we dont update the user's account balance or create a transaction */
      if (!isSuccess) {
        return res.status(500).json({
          msg: "transaction failed,please try again",
        });
      }
      return res.status(201).json({
        transaction,
        msg: "Payment successful",
      });
    } catch (error) {
      /**we return an error message to the client */
      res.status(500).json({ msg: error.message });
    }
  },
  //@route         POST /payments/schedulePayment
  //@decription  schedule subscription payment
  //@access      Private
  scheduleSubscription: async (req, res) => {
    const { token } = await getUserToken(req.body.transactionId);
    //TODO  we have to get the token from the transaction id to store in the subscription.
    /**if we have the subscAmt it means the person has started and therefore the count is one otherwise it is zero */
    let data = {
      subscAmt: req.body.subscAmt ? req.body.subscAmt : req.body.amount,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      interval: req.body.interval,
      txRef: req.body.txRef,
      currency: req.body.currency,
      subscId: req.body.subscId,
      status: moment(req.body.startDate) > moment() ? "inactive" : "active",
      token: token,
      paymentType: req.body.paymentType,
      count: moment(req.body.startDate) > moment() ? 0 : 1,
    };

    try {
      //!dont forget to verify the VERIFY_URL
      const { isVerified } = await verifyTransaction({
        flwRef: req.body.flwRef,
        amount: req.body.amount,
      });
      /**if the transaction is not verified we return an error */
      if (!isVerified) {
        return res.status(422).json({
          error: "Wrong url or malicious payment",
        });
      }
      //we first check if the user has a wallet with us or not
      const planCount = await PaymentPlan.find({
        user: req.user._id,
      }).countDocuments();
      /**if the user doesnt have an account with us ,we create one */
      /**we will receive an object containing start date,end date and amount with currency */
      /**the start date could be today or a day in the future so we keep that in mind setting up the wallet and transactions */
      if (planCount === 0) {
        /**we create a wallet for them */
        const { createdWallet } = await createWallet({
          user: req.user._id,
          currency: req.body.currency,
        });
        /**now the amount we have here is that amount not for the subscription but to verify the payment method */
        //! ACID NEEDED HERE
        const {
          isSuccess,
          transaction,
        } = await updateAmountAndCreateTransactionAndSubscription({
          user: req.user._id,
          id: createdWallet._id,
          amount: req.body.amount,
          subscription: data,
        });
        if (!isSuccess) {
          return res.status(500).json({
            msg: "transaction failed,please try again",
          });
        }
        return res.status(201).json({
          transaction,
          msg: "Payment successful",
        });
      }

      /**if no id was specified ,then the subscription plan belongs to the wallet account*/
      if (!req.body.id) {
        /**if the user didnt choose which plan we know this subscription belongs to the user's wallet account */
        /**even for scheduling we need to update the amount because there is some money we deduct from the user to verify the transaction to acquire the token */
        const Wallet = await PaymentPlan.findOne({
          $and: [{ name: "Wallet" }, { user: req.user._id }],
        });
        if (Wallet.amount === 0) {
          await Wallet.updateOne({ currency: req.body.currency });
        }
        /**we update the wallet amount if we dont get an id from the client */
        if (Wallet) {
          const {
            isSuccess,
            transaction,
          } = await updateAmountAndCreateTransactionAndSubscription({
            user: req.user._id,
            id: Wallet._id,
            amount: req.body.amount,
            subscription: data,
          });

          if (!isSuccess) {
            return res.status(500).json({
              msg: "transaction failed,please try again",
            });
          }

          return res.status(201).json({
            transaction,
            msg: "Payment successful",
          });
        }
      }
      /**we need to check the amount and update the currency */
      const plan = await PaymentPlan.findById(req.body.id);
      if (plan.amount === 0) {
        await plan.updateOne({ currency: req.body.currency });
      }
      /**if the user choose the id i.e they selected plan they want to subscribe to,
       * then we create a subscription with the plan specified  and create a transaction*/
      /**we update the plan the user has specified by id */
      //! ACID HERE
      const {
        isSuccess,
        transaction,
      } = await updateAmountAndCreateTransactionAndSubscription({
        user: req.user._id,
        id: req.body.id,
        amount: req.body.amount,
        subscription: data,
      });
      /**if the mongodb transaction fails we dont , we dont update the user's account balance or create a transaction */
      if (!isSuccess) {
        return res.status(500).json({
          msg: "transaction failed,please try again",
        });
      }
      /**return a successful message to the client */
      return res.status(201).json({
        transaction,
        msg: "Subscription created successfully",
      });
    } catch (error) {
      /**we return an error message to the client */
      res.status(500).json({ msg: error.message });
    }
  },
  getPaymentPlan: async (req, res) => {
    try {
      const { subscId } = await createNewFlutterWavePaymentPlan({
        interval: req.body.interval,
        name: req.body.name,
        currency: req.body.currency,
        amount: req.body.amount,
        duration: req.body.duration,
      });
      if (!subscId) {
        return res.status(400).json({
          msg: "Payment plan not created",
        });
      }
      return res.status(200).json({
        id: subscId,
      });
    } catch (error) {
      res.status(500).json({
        error: error.msg,
      });
    }
  },
  //@route        Put /payments/activateubscription
  //@description    activate a cancelled subscription
  //@access        Private
  activateSubscription: async (req, res) => {
    /**first we get the subscription  using the id */
    const subscriptionPlan = await Subscription.findById({
      _id: req.params.id,
    });
    if (subscriptionPlan.status !== "active") {
      await Subscription.updateOne(
        { _id: req.params.id },
        { status: "reactivated" }
      );
      return res.status(200).json({
        msg: "subscription activated successfully",
      });
    }
    /**find the subscription in flutterwave  using the flutterwave api*/
    const { subscriptions } = await getFlutterwaveSubscriptions();
    /**from the list of plans we have
     * since this is an array we have to pick the first item using array[0]
     */
    const subscriptionToActivate = subscriptions.filter(
      (subscription) =>
        subscription.plan === subscriptionPlan.subscId &&
        subscription.amount === subscriptionPlan.subscAmt
    )[0];
    /**we activate the flutterwave subscription */
    const { isSuccess } = await activateFlutterwaveSubscription(
      subscriptionToActivate
    );

    /** update the status from active to inactive*/
    if (!isSuccess) {
      return res.status(422).json({
        msg: "Plan not updated please try again",
      });
    }
    /**after that we update the subscription status in our app to inactive */
    await Subscription.updateOne({ _id: req.params.id }, { status: "active" });
    res.status(201).json({
      msg: "Congrats,subscription activated",
    });
  },

  //@route        Post /payments/cancelSubscription/:id
  //@description    cancel subscription
  //@access        Private
  cancelSubscription: async (req, res) => {
    /**we recieve the id of the subscription we want to cancel */
    const subscriptionPlan = await Subscription.findById({
      _id: req.params.id,
    });
    /**we first have to check id this subscription is active or inactive because if it is inactive then we dont have to go to flutterwave */
    if (subscriptionPlan.status !== "active") {
      await Subscription.updateOne(
        { _id: req.params.id },
        { status: "deactivated" }
      );
      return res.status(200).json({
        msg: "subscription cancelled successfully",
      });
    }
    /**find the subscription in flutterwave  using the flutterwave api*/
    const { subscriptions } = await getFlutterwaveSubscriptions();
    /**from the list of plans we have
     * since this is an array we have to pick the first item using array[0]
     */
    const subscriptionToCancel = subscriptions.filter(
      (subscription) =>
        subscription.plan === subscriptionPlan.subscId &&
        subscription.amount === subscriptionPlan.subscAmt
    )[0];
    /**find the corresponsing flutterwave subscription anc cancel it */
    //TODO if the subscription is not cancelled successfully then we will inform the client to retry
    /**cancel the subscription from flutterwave */
    const { isSuccess } = await cancelFlutterwaveSubscription(
      subscriptionToCancel
    );
    /**if the subscription has not been cancelled we return an error to the client */
    if (!isSuccess) {
      return res.status(422).json({
        msg: "Subscription has not been cancelled,please try again",
      });
    }
    /**after that we update the subscription status in our app to inactive */
    await Subscription.updateOne(
      { _id: req.params.id },
      { status: "deactivated" }
    );
    res.status(201).json({
      msg: "Congrats,subscription cancelled",
    });
  },
  updateSubscriptionFromFlutterwave: async (req, res) => {
    // retrieve the signature from the header
    var hash = req.headers["verif-hash"];
    //console.log(hash);
    if (!hash) {
      return res.status(422).json({ msg: "not from flutterwave" });
    }

    if (hash !== process.env.MY_HASH) {
      return res.status(422).json({ msg: "not my hash" });
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

    //console.log(req.body);
    if (
      req.body.data.narration === "Charge for Hourly Savings" ||
      "Charge for Daily Savings" ||
      "Charge for Monthly Savings" ||
      "Charge for Weekly Savings" ||
      "Charge for Yearly Savings"
    ) {
      /**we check if the transaction was successful or not  */
      if (req.body.event !== "charge.completed") {
        /**if it wasnt successful,then we find that subscription and increase the count to show that the subscription was actually intitiated ,it just failed */
        const subscription = await Subscription.findOne({
          trnsxn_ref: req.body.data.tx_ref,
        });
        /**if it wasnt  found we return an error message to flutterwave to retry */
        if (!subscription) {
          return res.status(422).json({
            msg: "Subscription not found",
          });
        }
        await Subscription.updateOne(
          { _id: subscription._id },
          { $inc: { count: 1 } }
        );
        return res.status(400).json({
          msg: "Subscription wasnt successful",
        });
      }
      /**if the charge has been completed successfully ,then first we find the subscription whose transaction ref matches the one received by the response
       * this is because the transacation refernce at the point of the subscription creation is what they send,so it is what we
       */
      /**we first find the subscription */
      /**with the subscription ,we acquire the plan and user to update the wallet and create a transaction */
      console.log(req.body.data.tx_ref);
      const subscription = await Subscription.findOne({
        trnsxn_ref: req.body.data.tx_ref,
      });
      /**if it wasnt  found we return an error message to flutterwave to retry */
      if (!subscription) {
        return res.status(422).json({
          msg: "Subscription not found",
        });
      }
      /**if the subscription exits ,lets
      /* then we use a MONGODB ACID transaction to update the wallet and create a transaction */
      const { isSuccess } = await updateAmountAndCreateTransaction({
        user: subscription.user,
        id: subscription.plan,
        amount: req.body.data.amount,
        paymentType: req.body.data.payment_type.slice(0, 11),
        currency: req.body.data.currency,
      });

      if (!isSuccess) {
        return res.status(500).json({
          msg: "transaction failed",
        });
      }
      /**we update the subscription count */
      await subscription.updateOne({ $inc: { count: 1 } });
      return res.status(200).json({
        msg: "Payment successful",
      });
    } //end of if statement
    return res.status(422).json({ msg: "This is not a subscription payment" });
  },

  /**this route is for when the client wants to change subscription details such as startDate,endDate,amount,interval */
  updateUserSubscription: async (req, res) => {
    /**so the first step is to pick the id of the subscription the user wants to subscribe to */
    let findArgs = {};
    for (let key in req.body) {
      findArgs[key] = req.body[key];
    }
    const subscriptionPlan = await Subscription.findById({
      _id: req.params.id,
    });
    /**we first have to check id this subscription is active or inactive because if it is inactive then we dont have to go to flutterwave */
    if (subscriptionPlan.status !== "active") {
      await Subscription.updateOne(
        { _id: req.params.id },
        { ...findArgs, subscId: "" }
      );
      return res.status(200).json({
        msg: "subscription updated successfully",
      });
    }
    /**find the subscription in flutterwave  using the flutterwave api*/
    const { subscriptions } = await getFlutterwaveSubscriptions();
    /**from the list of plans we have
     * since this is an array we have to pick the first item using array[0]
     */
    const subscriptionToCancel = subscriptions.filter(
      (subscription) =>
        subscription.plan === subscriptionPlan.subscId &&
        subscription.amount === subscriptionPlan.subscAmt
    )[0];
    //TODO if the subscription is not cancelled successfully then we will inform the client to retry
    /**cancel the subscription from flutterwave */
    const { isSuccess } = await cancelFlutterwaveSubscription(
      subscriptionToCancel
    );
    /**if the subscription has not been cancelled we return an error to the client */
    if (!isSuccess) {
      return res.status(422).json({
        msg: "Plan not updated please try again",
      });
    }
    /**create a new payment plan  */
    //TODO here is where we gonna calculate the new startDate
    /**the new start date becomes the next due date of the previous subscription */
    const { dueDate } = calculateDueDate({
      startDate: subscriptionPlan.startDate,
      endDate: subscriptionPlan.endDate,
      interval: subscriptionPlan.interval,
      count: subscriptionPlan.count,
    });
    console.log(moment(dueDate).format("DD MMMM YYYY HH:mmm"));
    /** otherwise update our personal subscription */
    /**update the status and remove the old subscId */
    await Subscription.updateOne(
      { _id: req.params.id },
      {
        ...findArgs,
        status: "reactivated",
        subscId: "",
        startDate: moment(dueDate).format("DD MMMM YYYY HH:mmm"),
      }
    );

    res.status(201).json({
      msg: "subscription updated successfuly",
    });
  },
};

/**not exported functions */
/**we create a wallet for a new user */
const createWallet = async (data) => {
  let createdWallet;
  createdWallet = new PaymentPlan({
    name: "Wallet",
    user: data.user,
    amount: 0,
    currency: data.currency,
  });
  /**Save checking account to database */
  await createdWallet.save();
  return {
    createdWallet,
  };
};

/**we run this function we make  a transaction with flutterwave to ensure it is a valid transaction */
const verifyTransaction = async (data) => {
  let isVerified;

  const response = await fetch(`${process.env.VERIFY_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      SECKEY: process.env.SECKEY,
      flw_ref: data.flwRef,
    }),
  });
  const res = await response.json();
  if (
    res.status === "success" &&
    res.data.flwMeta.chargeResponse === "00" &&
    res.data.amount == data.amount
  ) {
    isVerified = true;
  } else {
    isVerified = false;
  }
  return {
    isVerified,
  };
};

const getFlutterwaveSubscriptions = async () => {
  let subscriptions;
  let errors;
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/subscriptions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECKEY}`,
      },
    });
    const json = await response.json();
    subscriptions = json.data;
  } catch (error) {
    errors = error.msg;
  }
  return {
    subscriptions,
    errors,
  };
};

/**this is an api request to flutterwave to cancel a subscription */
/**what is needed is the subscription to cancl */
const cancelFlutterwaveSubscription = async (subscription) => {
  let isSuccess;
  if (subscription) {
    const response = await fetch(
      `${process.env.BASE_API_URL}/subscriptions/${subscription.id}/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECKEY}`,
        },
      }
    );
    const data = await response.json();
    /**if we get any error we return false to client */
    if (data.status === "error") {
      isSuccess = false;
    } else {
      isSuccess = true;
    }
  } else {
    isSuccess = false;
  }
  return {
    isSuccess,
  };
};

/**this function enables us to acquire a user's card token such that we can charge them for subsequent transactions */
const getUserToken = async (id) => {
  let token;
  let isSuccess;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/transactions/${id}/verify`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECKEY}`,
        },
      }
    );
    const res = await response.json();
    if (res.status === "success" && res.data.payment_type === "card") {
      isSuccess = true;
      token = res.data.card.token;
    } else {
      isSuccess = false;
    }
  } catch (error) {
    isSuccess = false;
  }
  return {
    token,
    isSuccess,
  };
};

/**this function creates a NEW FLUUTERWAVE PAYMENT PLAN  */
const createNewFlutterWavePaymentPlan = async (data) => {
  let subscId = "";
  //TODO This is a perfect opportunity to cancel the old payment plan as well
  //! currency is a must here
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/payment-plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECKEY}`,
      },
      body: JSON.stringify({
        name: data.name,
        interval: data.interval,
        duration: data.duration,
        amount: data.amount,
        currency: data.currency,
      }),
    });
    const res = await response.json();
    if (res.status === "success") {
      subscId = res.data.id;
    }
  } catch (error) {
    subscId = null;
  }
  return {
    subscId,
  };
};

const calculateDuration = ({ startDate, endDate, interval }) => {
  let duration;
  let numberOfMonths;
  if (interval === "hourly") {
    duration = moment(endDate, "DD MMMM YYYY").diff(
      moment(startDate, "DD MMMM YYYY"),
      "hours"
    );
  } else if (interval === "weekly") {
    duration = moment(endDate, "DD MMMM YYYY").diff(
      moment(startDate, "DD MMMM YYYY"),
      "weeks"
    );
  } else if (interval === "monthly") {
    duration = moment(endDate, "DD MMMM YYYY").diff(
      moment(startDate, "DD MMMM YYYY"),
      "months"
    );
  } else if (interval === "yearly") {
    duration = moment(endDate, "DD MMMM YYYY").diff(
      moment(startDate, "DD MMMM YYYY"),
      "years"
    );
  } else if (interval === "quarterly") {
    numberOfMonths = moment(endDate, "DD MMMM YYYY").diff(
      moment(startDate, "DD MMMM YYYY"),
      "months"
    );
    duration = numberOfMonths / 4;
  } else {
    /**this is for every 6 months */
    numberOfMonths = moment(endDate, "DD MMMM YYYY").diff(
      moment(startDate, "DD MMMM YYYY"),
      "months"
    );
    duration = numberOfMonths / 6;
  }
  return {
    duration,
  };
};

const activateFlutterwaveSubscription = async (subscription) => {
  let isSuccess;
  try {
    if (subscription) {
      const response = await fetch(
        `${process.env.BASE_API_URL}/subscriptions/${subscription.id}/activate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SECKEY}`,
          },
        }
      );
      const res = await response.json();
      if (res.status === "success") {
        isSuccess = true;
      } else {
        isSuccess = false;
      }
    }
  } catch (error) {
    isSuccess = false;
  }
  return {
    isSuccess,
  };
};

const updateAmountAndCreateTransaction = async (data) => {
  console.log(data);
  let isSuccess;
  let transaction;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const plan = await PaymentPlan.findOneAndUpdate(
      { _id: data.id, user: data.user },
      { $inc: { amount: data.amount } },
      opts
    );
    transaction = await Transaction.create({
      user: data.user,
      paymentPlan: data.id,
      amount: data.amount,
      currency: data.currency,
      type: "income",
      pymnt_Mthd: data.paymentType,
    });

    await session.commitTransaction();
    session.endSession();
    isSuccess = true;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    isSuccess = false;
  }
  return { isSuccess, transaction };
};

const updateAmountAndCreateTransactionAndSubscription = async (data) => {
  let isSuccess;
  let transaction;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const plan = await PaymentPlan.findOneAndUpdate(
      { _id: data.id },
      { $inc: { amount: data.amount } },
      opts
    );
    transaction = await Transaction.create({
      user: data.user,
      paymentPlan: data.id,
      amount: data.amount,
      currency: data.subscription.currency,
      type: "income",
      pymnt_Mthd: data.subscription.paymentType,
    });
    const subscription = await Subscription.create({
      user: data.user,
      plan: data.id,
      subscAmt: data.subscription.subscAmt,
      trnsxn_ref: data.subscription.txRef,
      interval: data.subscription.interval,
      startDate: moment(data.subscription.startDate).format(
        "DD MMMM YYYY HH:mm"
      ),
      endDate: moment(data.subscription.endDate).format("DD MMMM YYYY HH:mm"),
      subscId: data.subscription.subscId,
      subscToken: data.subscription.token,
      status: data.subscription.status,
      currency: data.subscription.currency,
      count: data.subscription.count,
    });

    await session.commitTransaction();
    session.endSession();
    isSuccess = true;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    isSuccess = false;
  }
  return { isSuccess, transaction };
};
/**every midnight  "0 0 0 * * *"*/
//schedule susbscriptions to run every midnight
cron.schedule("*/20 * * * *", async () => {
  console.log("running a task every midnight");
  /**we look through our subscriptions to find the subscriptions whose start state is today and has a status of inactive */
  const subscriptions = await Subscription.find({
    $and: [
      {
        startDate: {
          $lte: moment().endOf("day").format("DD MMMM YYYY HH:mm"),
          $gte: moment().startOf("day").format("DD MMMM YYYY HH:mm"),
        },
      },
      { status: { $in: ["inactive", "reactivated"] } },
    ],
  }).populate("user", "email");
  console.log("subs", subscriptions);
  /**using the token stored in the subsciption,we create flutterwave subscriptions */
  /**we loop through the subscriptions  every after a given time interval because flutterwave doesnt support bulk writes*/
  for (var i = 1; i <= subscriptions.length; i++) {
    (function (i) {
      setTimeout(function () {
        const subscription = subscriptions[i - 1];
        console.log(subscription);
        /** we check if the subscription has a subscId or not*/
        if (subscription.subscId) {
          /**we make a request to create a flutterwave subscription */
          createNewFlutterWaveSubscription(subscription);
        } else {
          createNewFlutterWavePaymentPlanAndSubscription(subscription);
        }
      }, 50000 * i);
    })(i);
  }
  /**for each successful subscriptions,we update the status to active */
});

//! DONT FORGET TO PASS IN THE SUBSCRID
const createNewFlutterWaveSubscription = async (subscription) => {
  //! currency is a must here
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/tokenized-charges`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECKEY}`,
        },
        body: JSON.stringify({
          token: subscription.subscToken,
          amount: subscription.subscAmt,
          email: subscription.user.email,
          tx_ref: Date.parse(new Date()),
          payment_plan: subscription.subscId,
          currency: subscription.currency,
        }),
      }
    );
    const res = await response.json();
    if (res.status === "success") {
      /**we ran acid that updates the client's amount,create a transaction */
      const { isSuccess } = await updateAmountAndCreateTransaction({
        user: subscription.user,
        id: subscription.plan,
        amount: subscription.subscAmt,
        //! add currency and payment type
        paymentType: res.data.payment_type,
        currency: res.data.currency,
      });
      /**this transaction needs the plan to be updated ,the user the transaction belongs to and the amount */
      /**afterwards we update the status of the subscription to active */
      /**here we need the subscription id and increase the count
       */
      if (isSuccess) {
        const sub = await Subscription.updateOne(
          { _id: subscription._id },
          { status: "active", $inc: { count: 1 } }
        );
      }
    }
  } catch (error) {
    throw Error("subscription failed");
  }
};

const calculateDueDate = ({ startDate, count, endDate, interval }) => {
  /**the first thing we do is to add */

  let dueDate;
  if (interval === "hourly") {
    dueDate = moment(startDate, "DD MMMM YYYY").add(count, "hours");
  } else if (interval === "daily") {
    dueDate = moment(startDate).add(count, "days");
  } else if (interval === "weekly") {
    dueDate = moment(startDate, "DD MMMM YYYY").add(count, "weeks");
  } else if (interval === "monthly") {
    dueDate = moment(startDate, "DD MMMM YYYY").add(count, "months");
  } else if (interval === "yearly") {
    dueDate = moment(startDate, "DD MMMM YYYY").add(count, "years");
  } else if (interval === "quarterly") {
    dueDate = moment(startDate, "DD MMMM YYYY").add(count * 4, "months");
  } else {
    /**this is for every 6 months */
    dueDate = moment(startDate, "DD MMMM YYYY").add(count * 6, "months");
  }
  if (dueDate > endDate) {
    dueDate = endDate;
  }
  return {
    dueDate,
  };
};

const createNewFlutterWavePaymentPlanAndSubscription = async (subscription) => {
  /**we get the duration */
  const { duration } = await calculateDuration({
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    interval: subscription.interval,
  });
  const { subscId } = await createNewFlutterWavePaymentPlan({
    interval: subscription.interval,
    name: "MyWallet",
    currency: subscription.currency,
    amount: subscription.subscAmt,
    duration: duration,
  });
  if (!subscId) {
    return res.status(400).json({
      msg: "Payment plan not created",
    });
  }
  await Subscription.updateOne({ _id: subscription._id }, { subscId });
  const updatedSubscription = await Subscription.findById({
    _id: subscription._id,
  }).populate("user", "email");
  createNewFlutterWaveSubscription(updatedSubscription);
};
