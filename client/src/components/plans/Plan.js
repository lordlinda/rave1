import React, { forwardRef } from "react";
import { numberWithCommas } from "../../helpers/middleware";
import { Link } from "react-router-dom";

const Plan = forwardRef(({ plan }, ref) => {
  return (
    <div ref={ref}>
      <div>
        <Link to={`/plan/${plan._id}`}>
          <div className="plans__plan">
            <p>{plan.name}</p>
            <span>
              {" "}
              {plan.currency} {numberWithCommas(plan.amount)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
});

export default Plan;
