const Subscription = require("../models/Subscription");
const fetch = require("node-fetch");

module.exports = {
  getSubscription: async (req, res) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
      return res.status(200).json({
        subscription,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.msg,
      });
    }
  },
  deleteSubscription: async (req, res) => {
    try {
      const subscriptionPlan = await Subscription.findById(req.params.id);
      /**check the status */
      if (subscriptionPlan.status !== "active") {
        await subscriptionPlan.delete();
        return res.status(200).json({
          msg: "Subscription deleted successfully",
        });
      }
      const { subscriptions } = await getFlutterwaveSubscriptions();
      if (!subscriptions && subscriptionPlan.status === "active") {
        await subscriptionPlan.delete();
        return res.status(200).json({
          msg: "Subscription deleted successfully",
        });
      }
      /**from the list of plans we have
       * since this is an array we have to pick the first item using array[0]
       */
      const subscriptionToCancel = subscriptions.filter(
        (subscription) =>
          subscription.plan === subscriptionPlan.subscId &&
          subscription.amount === subscriptionPlan.amount
      )[0];
      //TODO if the subscription is not cancelled successfully then we will inform the client to retry
      /**cancel the subscription from flutterwave */
      const { isSuccess } = await cancelFlutterwaveSubscription(
        subscriptionToCancel
      );
      /**if the subscription has not been cancelled we return an error to the client */
      if (!isSuccess) {
        return res.status(422).json({
          msg: "Subscription deletion failed,please try again",
        });
      }
      await subscriptionPlan.delete();

      return res.status(200).json({
        msg: "Congragulations,subscription deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error.msg,
      });
    }
  },
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
    console.log(json.data);
  } catch (error) {
    errors = error.msg;
  }
  return {
    subscriptions,
    errors,
  };
};

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
