import React, { forwardRef } from "react";
import moment from "moment";
import { numberWithCommas } from "../../helpers/middleware";

const Transaction = forwardRef(({ transaction }, ref) => {
  return (
    <div ref={ref}>
      <div>
        <div className="transactions__transaction">
          <div>
            <h1>{transaction?.paymentPlan?.name}</h1>
            <span>{moment(transaction.createdAt).format("DD MMM YYYY")}</span>
          </div>

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
