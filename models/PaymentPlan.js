const mongoose = require("mongoose");

const paymentPlanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    targetAmount: {
      type: Number,
    },
    currency: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", paymentPlanSchema);
