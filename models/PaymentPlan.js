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
    actualBalance: {
      type: Number,
    },
    availableBalance: { type: Number, default: 0 },
    targetAmount: {
      type: Number,
    },
    currency: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", paymentPlanSchema);
