import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "../Reusables/Button.js";
import { getDashboardTransactions } from "../../redux/actions/transactions";
import "./transactions.css";
import moment from "moment";
import { numberWithCommas } from "../../helpers/middleware";

const TransactionList = (props) => {
  useEffect(() => {
    props.getDashboardTransactions();
  }, [props.transactions.length]);
  return (
    <div className="transactionsDashboard">
      {/*the plans title*/}
      <div className="transactionsDashboard__heading">
        <p className=""> Recent Transactions</p>
        <Button href="/transactions" title="See All" moreStyle="" />
      </div>
      <div className="transactionsDashboard__transactions">
        {/*mapout our transactions*/}
        {props.transactions.map((transaction) => (
          <div
            className="transactionDashboard__transaction"
            key={transaction._id}
          >
            <div>
              <div className="transaction__details">
                <h1>{transaction.paymentPlan?.name}</h1>
                <span>
                  {moment(transaction.createdAt).format("DD MMM YYYY")}
                </span>
              </div>
              <p
                className={`${transaction.type === "income" ? "green" : "red"}`}
              >
                {transaction.currency} {numberWithCommas(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: state.data.dashboardTransactions,
    loading: state.data.loading,
  };
};

export default connect(mapStateToProps, { getDashboardTransactions })(
  TransactionList
);
