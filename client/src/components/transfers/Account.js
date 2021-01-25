import React, { forwardRef } from "react";
import { numberWithCommas } from "../../helpers/middleware";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const Account = forwardRef(({ plan, id, getId }, ref) => {
  const getPlanId = (plan) => {
    getId(plan);
  };
  return (
    <div ref={ref}>
      <div className="accountTransfer__plan" onClick={() => getPlanId(plan)}>
        <div>
          <h1>{plan.name}</h1>
          {plan._id === id && <CheckCircleIcon />}
        </div>

        <span>
          {" "}
          {plan.currency} {numberWithCommas(plan.amount)}
        </span>
      </div>
    </div>
  );
});

export default Account;
