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
import activityImage from "../../images/undraw_Finance_re_gnv2.svg";
import { PulseLoader } from "react-spinners";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
const SinglePlan = (props) => {
  const [open, setOpen] = useState(false);
  const [topUp, setTopUp] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const id = props.match.params.id;
  useEffect(() => {
    props.getPlan(id);
  }, []);

  const handleTopUp = () => {
    setWithdraw(false);
    setTopUp(true);
    setOpen(!open);
  };

  const handleWithdraw = () => {
    setTopUp(false);
    setWithdraw(true);
    setOpen(!open);
  };

  const handleChange = (e) => {
    props.history.push(e.target.value, { id });
  };

  //give the first subscriptions
  //we give a distance from the top one
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="plan"
    >
      {props.loading ? (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      ) : (
        <>
          <div className="plan__header">
            <BackArrow goBack={props.history} />
            {props.plan.name !== "Wallet" && (
              <Link to={`/editplan/${id}`}>
                <MoreVertIcon />
              </Link>
            )}
          </div>
          <div className="plan__middle">
            <h1>{props.plan?.name}</h1>
            {props.plan?.amount && (
              <p>
                {props.plan.currency} {numberWithCommas(props.plan?.amount)}
              </p>
            )}
            <div className="plan__actions">
              <div>
                <Fab aria-label="add">
                  <AddIcon onClick={handleTopUp} />
                </Fab>
                <p>Topup</p>
              </div>
              <div>
                <Fab aria-label="remove">
                  <RemoveIcon onClick={handleWithdraw} />
                </Fab>
                <p>Withdraw</p>
              </div>
            </div>
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
            <div className="plan__bodyData">
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
                          <div className="plan_subInterval">
                            <p>{subscription.interval}</p>
                            <ArrowForwardIcon />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </FlipMove>
                </div>
              )}

              <div className="plan__transactions">
                {props.plan?.transactions?.length > 0 ? (
                  <>
                    <h1> Recent Transactions</h1>
                    <FlipMove>
                      {props.plan?.transactions.map((transaction) => (
                        <Transaction
                          key={transaction._id}
                          transaction={transaction}
                        />
                      ))}
                    </FlipMove>
                  </>
                ) : (
                  <div className="empty__plan">
                    <img src={activityImage} alt="no activity" />
                    <p>{`Start saving,your goal is just one step away`}</p>
                  </div>
                )}
              </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="interval"
                    name="interval1"
                    onChange={handleChange}
                  >
                    {topUp && (
                      <>
                        <FormControlLabel
                          value="/amount"
                          control={<Radio />}
                          label="Make a one-time payment"
                        />
                        <FormControlLabel
                          value="/createSubscription"
                          control={<Radio />}
                          label="Setup scheduled payments"
                        />
                      </>
                    )}
                    {withdraw && (
                      <>
                        <FormControlLabel
                          value="/account"
                          control={<Radio />}
                          label="Account Transfer"
                        />
                        <FormControlLabel
                          value="/mobile"
                          control={<Radio />}
                          label="Mobile Transfer"
                        />
                        <FormControlLabel
                          value="/bank"
                          control={<Radio />}
                          label="Bank Transfer"
                        />
                      </>
                    )}
                  </RadioGroup>
                </FormControl>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    plan: state.plans.plan,
    loading: state.plans.isPlanLoading,
  };
};

export default connect(mapStateToProps, { getPlan })(SinglePlan);
