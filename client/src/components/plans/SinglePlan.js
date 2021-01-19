import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { numberWithCommas } from "../../helpers/middleware.js";
import ProgressBar from "../Reusables/ProgressBar.js";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BackArrow from "../Reusables/BackArrow.js";
import { getPlan } from "../../redux/actions/plans";
import "./plan.css";
import FlipMove from "react-flip-move";
import { motion } from "framer-motion";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";
import Transaction from "../transactions/Transaction.js";
const SinglePlan = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const id = props.match.params.id;
  useEffect(() => {
    props.getPlan(id);
  }, []);

  const handleChange = (event) => {
    if (event.target.value === "single") {
      props.history.push("/amount", { id });
    } else {
      props.history.push("/createSubscription", { id });
    }
  };

  //give the first subscriptions
  //we give a distance from the top one
  return (
    /*didnt use a w-1/2 because of no space between the boxes*/
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="plan"
    >
      <div className="plan__header">
        <BackArrow goBack={props.history} />
        <Link to={`/editplan/${id}`}>
          <MoreVertIcon />
        </Link>
      </div>
      <div className="plan__middle">
        <h1>
          {props.plan?.name}
          {""}
          <Fab aria-label="add" className="plan__button">
            <AddIcon onClick={handleClose} />
          </Fab>
        </h1>
        {props.plan?.amount && (
          <p>
            {" "}
            {props.plan.currency} {numberWithCommas(props.plan?.amount)}
          </p>
        )}
      </div>
      <div className="plan__body">
        <div className="plan__progressBar">
          {props.plan?.targetAmount && (
            <ProgressBar
              amount={props.plan?.amount}
              targetAmount={props.plan?.targetAmount}
            />
          )}
        </div>
        {props.plan?.subscriptions?.length > 0 && (
          <div className="plan__subscriptions">
            <h1>Subscriptions</h1>
            <FlipMove>
              {props.plan?.subscriptions.map((subscription) => (
                <Link
                  to={`/subscription/${subscription._id}`}
                  key={subscription._id}
                >
                  <div className="plan__sub">
                    <div>
                      <h1>{props.plan?.name}</h1>
                      <p>
                        {subscription.currency} {subscription.subscAmt}
                      </p>
                    </div>
                    <p>{subscription.interval}</p>
                  </div>
                </Link>
              ))}
            </FlipMove>
          </div>
        )}

        <div className="plan__transactions">
          {props.plan?.transactions?.length > 0 && (
            <>
              <h1>Transactions</h1>
              <FlipMove>
                {props.plan?.transactions.map((transaction) => (
                  <Transaction
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))}
              </FlipMove>
            </>
          )}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="interval"
                name="interval1"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Make a one-time payment"
                />
                <FormControlLabel
                  value="schedule"
                  control={<Radio />}
                  label="Setup scheduled payments"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    plan: state.plans.plan,
  };
};

export default connect(mapStateToProps, { getPlan })(SinglePlan);
