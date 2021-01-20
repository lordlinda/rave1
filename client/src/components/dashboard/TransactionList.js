import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "../Reusables/Button.js";
import { getDashboardTransactions } from "../../redux/actions/transactions";
import "./transactions.css";
import FlipMove from "react-flip-move";
import Transaction from "../transactions/Transaction.js";

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
        {props.transactions.length > 0 ? (
          <FlipMove>
            {props.transactions &&
              props.transactions.map((transaction) => (
                <Transaction key={transaction._id} transaction={transaction} />
              ))}
          </FlipMove>
        ) : (
          <p className="transanctions__empty">No transactions yet</p>
        )}
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
