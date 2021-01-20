import React from "react";
import Total from "./Total.js";
import Plans from "./Plans.js";
import TransactionList from "./TransactionList.js";
import LabelBottomNavigation from "../Reusables/BottomNavigation";
import "./dashboard.css";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import { connect } from "react-redux";

const Dashboard = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="dashboard"
    >
      {props.loading ? (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      ) : (
        <>
          <Total />
          <Plans />
          <TransactionList />
        </>
      )}

      <LabelBottomNavigation />
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.plans.loading,
  };
};
export default connect(mapStateToProps)(Dashboard);
