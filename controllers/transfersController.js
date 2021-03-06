const PaymentPlan = require("../models/PaymentPlan.js");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

module.exports = {
  /**mobile money */
  mobilePayment: async (req, res) => {
    const plan = await PaymentPlan.findById(req.body.id);

    if (plan.availableBalance < req.body.amount) {
      return res.status(422).json({
        msg: "Insufficient funds",
      });
    }
    //!currency is a must here
    const { isSuccessful } = await makeFlutterWaveMobileTransfer({
      currency: plan.currency,
      id: req.body.id,
      amount: req.body.amount,
      name: req.user.username,
      phone: req.body.phone,
    });

    if (!isSuccessful) {
      return res.status(500).json({
        msg: "transaction failed,please try again",
      });
    }

    const data = {
      id: plan._id,
      user: plan.user,
      amount: req.body.amount,
      currency: plan.currency,
      paymentType: "mobilemoney",
    };

    const { isSuccess, transaction } = await updateAmountAndCreateTransaction(
      data
    );
    if (!isSuccess) {
      return res.status(500).json({
        msg: "withdrawal failed,please try again",
      });
    }
    return res.status(201).json({
      transaction,
      msg: "Withdrawal successful",
    });
  },
  /**bank transfer */
  bankPayment: async (req, res) => {
    const plan = await PaymentPlan.findById(req.body.id);

    if (plan.availableBalance < req.body.amount) {
      return res.status(422).json({
        msg: "Insufficient funds",
      });
    }
    //!currency is a must here
    const { isSuccessful } = await makeFlutterWaveIntlOtherBankTransfer({
      currency: plan.currency,
      id: req.body.id,
      amount: req.body.amount,
      name: req.user.username,
      account_number: req.body.account_number,
      account_bank: req.body.account_bank,
    });
    if (!isSuccessful) {
      return res.status(500).json({
        msg: "transaction failed,please try again",
      });
    }
    const data = {
      id: plan._id,
      user: plan.user,
      amount: req.body.amount,
      currency: plan.currency,
      paymentType: "mobilemoney",
    };

    const { isSuccess, transaction } = await updateAmountAndCreateTransaction(
      data
    );
    if (!isSuccess) {
      return res.status(500).json({
        msg: "withdrawal failed,please try again",
      });
    }
    return res.status(201).json({
      transaction,
      msg: "Withdrawal successful",
    });
  },

  accountTransfer: async (req, res) => {
    try {
      /**this is to ensure both plans belong to the user */
      const A = PaymentPlan.findById(req.body.from);
      const B = PaymentPlan.findById(req.body.to);
      if (B.amount === 0) {
        await PaymentPlan.updateOne(
          { _id: req.body.to },
          { currency: A.currency }
        );
      }

      /**move money from one account to another */
      await transferAcct({
        from: req.body.from,
        to: req.body.to,
        amount: req.body.amount,
      });
      return res.status(201).json({
        msg: "Tranfer successfull",
      });

      /**return a successful message */
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  addNumber: async (req, res) => {
    console.log(req.body.phone);
    /** */
    try {
      /**add these phone number to the user array */
      await User.updateOne(
        { _id: req.user._id },
        { $push: { phoneNumber: req.body.phone } }
      );
      return res.status(201).json({
        msg: "Number has been added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Sorry,failed to add phone number",
      });
    }
  },
  addBankAcct: async (req, res) => {
    try {
      /**add these phone number to the user array */
      await User.updateOne(
        { _id: req.user._id },
        { $push: { bankAccounts: req.body } }
      );
      return res.status(201).json({
        msg: "Bank Account has been added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Sorry,failed to add bank Account",
      });
    }
  },
  deleteBankAcct: async (req, res) => {
    /**we get the user's bank accounts and filter out this is */
    const user = await User.findById(req.user._id);
    /**we update the user's bank accounts */
    const accounts = await user.bankAccounts.filter(
      (account) => account !== req.body
    );
    console.log(accounts);
    await User.updateOne({ _id: req.user._id }, { bankAccounts: accounts });
    res.status(200).json({
      msg: "Bank Account removed successfully",
    });
  },
};

const makeFlutterWaveMobileTransfer = async (data) => {
  let isSuccessful;
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/transfers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECKEY}`,
      },
      body: JSON.stringify({
        account_bank: "MPS",
        account_number: data.phone,
        amount: data.amount,
        narration: data.id,
        currency: data.currency,
        reference: Date.parse(new Date()),
        beneficiary_name: data.name,
        //callback_url: process.env.TRANSFER_WEBHOOK,
      }),
    });
    const res = await response.json();
    if (res.status === "success") {
      isSuccessful = true;
    } else {
      throw new Error("Transaction creation failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return {
    isSuccessful,
  };
};

const transferAcct = async (data) => {
  let isSuccess;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    /**decrease the amount in the acount we want to withdraw from */
    const A = await PaymentPlan.findOneAndUpdate(
      { _id: data.from },
      { $inc: { availableBalance: -data.amount } },
      opts
    );
    /**if balance is insufficient,we throw an error */
    if (A.availableBalance < data.amount) {
      // If A would have negative balance, fail and abort the transaction
      // `session.abortTransaction()` will undo the above `findOneAndUpdate()`
      throw new Error("Insufficient funds ");
    }
    /**create transaction for withdrawal */
    await Transaction.create({
      user: A.user,
      paymentPlan: data.from,
      amount: data.amount,
      currency: A.currency,
      type: "expense",
      pymnt_Mthd: "withdrawal",
    });
    const B = await PaymentPlan.findOneAndUpdate(
      { _id: data.to },
      { $inc: { availableBalance: data.amount } },
      opts
    );
    await Transaction.create({
      user: B.user,
      paymentPlan: data.to,
      amount: data.amount,
      currency: A.currency,
      type: "income",
      pymnt_Mthd: "withdrawal",
    });
    await session.commitTransaction();
    session.endSession();
    isSuccess = true;
  } catch (error) {
    isSuccess = false;
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow so calling function sees error
  }
};

const updateAmountAndCreateTransaction = async (data) => {
  let isSuccess;
  let transaction;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const plan = await PaymentPlan.findOneAndUpdate(
      { _id: data.id, user: data.user },
      { $inc: { availableBalance: -data.amount } },
      opts
    );
    if (!plan) {
      throw new Error("No plan found");
    }
    transaction = await Transaction.create({
      user: data.user,
      paymentPlan: data.id,
      amount: data.amount,
      currency: data.currency,
      type: "expense",
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

const makeFlutterWaveIntlOtherBankTransfer = async (data) => {
  let isSuccessful;

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/transfers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECKEY}`,
      },
      body: JSON.stringify({
        amount: data.amount,
        narration: data.id,
        currency: data.currency,
        //!dont forget to remove this
        reference: `${Date.parse(new Date())}${process.env.ENSURE_SUCCESS}`,
        beneficiary_name: data.name,
        account_bank: data.account_bank,
        account_number: data.account_number,
      }),
    });
    const res = await response.json();
    if (res.status === "success") {
      isSuccessful = true;
    } else {
      throw new Error("Transaction creation failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return {
    isSuccessful,
  };
};
