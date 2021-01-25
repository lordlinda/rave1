import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardPlans } from "../../redux/actions/plans";
import Button from "../Reusables/Button.js";
import "./plans.css";
import Plan from "./Plan";
import FlipMove from "react-flip-move";
const Plans = (props) => {
  useEffect(() => {
    props.getDashboardPlans();
  }, []);

  return (
    <div className="plansDashboard">
      {/*the plans title*/}
      <div className="plansDashboard__heading">
        <p>Plans</p>
        <Button href="/plans" title="See All" />
      </div>
      <div className="plansDashboard__plans">
        {/*mapout our plans*/}
        {props.plans.length > 0 && (
          <FlipMove>
            {
              /*we want to display only two plans on dashboard*/
              props.plans.map((plan) => {
                return <Plan plan={plan} key={plan._id} />;
              })
            }
          </FlipMove>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans.dashboardPlans,
    loading: state.data.loading,
  };
};

export default connect(mapStateToProps, { getDashboardPlans })(Plans);
