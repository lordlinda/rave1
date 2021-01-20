import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPlans } from "../../redux/actions/plans";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./allPlans.css";
import { Link } from "react-router-dom";
import LabelBottomNavigation from "../Reusables/BottomNavigation";
import { motion } from "framer-motion";
import FlipMove from "react-flip-move";
import Plan from "./Plan";
import image from "../../images/undraw_stepping_up_g6oo.svg";
import { PulseLoader } from "react-spinners";

const AllPlans = (props) => {
  useEffect(() => {
    props.getAllPlans();
  }, []);
  console.log(props.loading);
  const getCompletedPlans = () => {
    const completedPlans = props.plans.filter(
      (plan) => plan.targetAmount === plan.amount
    );
    return completedPlans.length;
  };
  getCompletedPlans();
  const customEnterAnimation = {
    transform: "translateX(100%)",
    opacity: 0.1,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="plans"
    >
      {props.loading && (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      )}
      <div className="plans__header">
        <h1>Your Plans</h1>
      </div>
      {/*mapout our plans*/}
      {props.plans.length > 0 ? (
        <div className="plans__body">
          <FlipMove
            enterAnimation={{
              from: customEnterAnimation,
              to: {},
            }}
          >
            {props.plans.map((plan) => (
              <Plan plan={plan} key={plan._id} />
            ))}
          </FlipMove>
        </div>
      ) : (
        <div className="empty__goals">
          <img src={image} alt="empty plans" />
          <p> Start saving with Pasbanc to achieve your financial goals !</p>
        </div>
      )}

      <Fab
        aria-label="add"
        className="plans__button"
        component={Link}
        to="/createPlan"
      >
        <AddIcon />
      </Fab>
      <LabelBottomNavigation />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
    loading: state.plans.loading,
  };
};

export default connect(mapStateToProps, { getAllPlans })(AllPlans);
