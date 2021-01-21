import moment from "moment";
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateTotal = (plans) => {
  if (plans.length > 0) {
    let total = 0;
    plans.map((plan) => {
      return (total += plan.amount);
    });
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const calculateDuration = ({ startDate, endDate, interval }) => {
  var a = moment(startDate, "YYYY-MM-DD");
  var b = moment(endDate, "YYYY-MM-DD");
  let duration;
  let numberOfMonths;
  if (interval === "hourly") {
    duration = moment(b).diff(moment(a), "hours");
  } else if (interval === "weekly") {
    duration = moment(b).diff(moment(a), "weeks");
  } else if (interval === "monthly") {
    duration = moment(b).diff(moment(a), "months");
  } else if (interval === "yearly") {
    duration = moment(b).diff(moment(a), "years");
  } else if (interval === "quarterly") {
    numberOfMonths = moment(b).diff(moment(a), "months");
    duration = numberOfMonths / 4;
  } else {
    /**this is for every 6 months */
    numberOfMonths = moment(b).diff(moment(a), "months");
    duration = numberOfMonths / 6;
  }

  return {
    duration,
  };
};

export const calculateDueDate = ({ startDate, count, endDate, interval }) => {
  /**the first thing we do is to add */
  let dueDate;
  if (interval === "hourly") {
    dueDate = moment(startDate).add(count, "hours");
  } else if (interval === "daily") {
    dueDate = moment(startDate).add(count, "days");
  } else if (interval === "weekly") {
    dueDate = moment(startDate).add(count, "weeks");
  } else if (interval === "monthly") {
    dueDate = moment(startDate).add(count, "months");
  } else if (interval === "yearly") {
    dueDate = moment(startDate).add(count, "years");
  } else if (interval === "quarterly") {
    dueDate = moment(startDate).add(count * 4, "months");
  } else {
    /**this is for every 6 months */
    dueDate = moment(startDate).add(count * 6, "months");
  }
  if (dueDate > endDate) {
    dueDate = endDate;
  }

  return {
    dueDate,
  };
};
