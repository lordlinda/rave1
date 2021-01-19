import React from "react";
import Total from "./Total.js";
import Plans from "./Plans.js";
import TransactionList from "./TransactionList.js";
import LabelBottomNavigation from "../Reusables/BottomNavigation";
import "./dashboard.css";
import { motion } from "framer-motion";
const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="dashboard"
    >
      <Total />
      <Plans />
      <TransactionList />
      <LabelBottomNavigation />
    </motion.div>
  );
};

export default Dashboard;
