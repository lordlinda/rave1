import React from "react";
import { FadeLoader } from "react-spinners";
import { motion } from "framer-motion";

function Processor({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="pay_processing"
    >
      <FadeLoader height={5} color="#fff" margin={1} />
      <p>{text}</p>
    </motion.div>
  );
}

export default Processor;
