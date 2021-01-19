const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trnsxn_ref: {
      type: String,
    },
    subscId: {
      type: Number,
    },
    currency: {
      type: String,
    },
    subscAmt: {
      type: Number,
    },
    status: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    subscToken: {
      type: String,
    },
    count: Number,
    interval: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
