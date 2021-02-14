import React, { forwardRef } from "react";
import moment from "moment";
import { numberWithCommas } from "../../helpers/middleware";

const Transaction = forwardRef(({ transaction }, ref) => {
  return (
    <div ref={ref}>
      <div>
        <div className="transactions__transaction">
          <div className="hiddenDetails">
            <h1>{transaction?.paymentPlan?.name}</h1>
            <span>{moment(transaction.createdAt).format("DD MMM YYYY")}</span>
          </div>
          <h1 className="hidden_transaction">
            {transaction?.paymentPlan?.name}
          </h1>
          <span className="hidden_transaction">
            {moment(transaction.createdAt).format("DD MMM YYYY")}
          </span>
          <p className="hidden_transaction">{transaction.pymnt_Mthd}</p>
          <p className={`${transaction.type === "income" ? "green" : "red"}`}>
            {transaction.currency}{" "}
            {transaction?.amount && numberWithCommas(transaction.amount)}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Transaction;
