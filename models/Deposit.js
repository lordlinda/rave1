const mongoose = require("mongoose");

const depositSchema = mongoose.Schema(
  {
    maturityDate: {
      type: String,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    amount: {
      type: Number,
    },
    trnsxn_ref: {
      type: String,
    },
    period: Number,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deposit", depositSchema);
