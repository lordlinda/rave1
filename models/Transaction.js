const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    pymnt_Mthd: {
      type: String,
    },
    currency: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
