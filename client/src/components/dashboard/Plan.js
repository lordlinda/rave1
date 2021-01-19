import React, { forwardRef } from "react";
import { numberWithCommas } from "../../helpers/middleware";
import { Link } from "react-router-dom";

const Plan = forwardRef(({ plan }, ref) => {
  return (
    <div ref={ref}>
      <div key={plan._id} className="planDashboard__plan">
        <Link to={`/plan/${plan._id}`}>
          <h1>{plan.name}</h1>
          <p>
            {" "}
            {plan.currency} {numberWithCommas(plan.amount)}
          </p>
        </Link>
      </div>
    </div>
  );
});

export default Plan;
