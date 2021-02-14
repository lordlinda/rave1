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
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogContent,
  IconButton,
  Button,
  DialogActions,
} from "@material-ui/core";
import Transaction from "../transactions/Transaction.js";
import activityImage from "../../images/undraw_Finance_re_gnv2.svg";
import { PulseLoader } from "react-spinners";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import RadioButtons from "../Reusables/RadioButtons";
import {
  topUpOptions,
  transferOptions,
  durationOptions,
} from "../Reusables/select/Options";

const SinglePlan = ({ match, history, plan, loading, getPlan }) => {
  const [open, setOpen] = useState(false);
  const [topUp, setTopUp] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [renew, setRenew] = useState(false);
  const [duration, setDuration] = useState("");
  const handleClose = () => {
    setOpen(!open);
  };
  const id = match.params.id;
  useEffect(() => {
    getPlan(id);
  }, []);

  const handleTopUp = () => {
    setWithdraw(false);
    setRenew(false);
    setTopUp(true);
    setOpen(!open);
  };

  const handleWithdraw = () => {
    setTopUp(false);
    setRenew(false);

    setWithdraw(true);
    setOpen(!open);
  };
  const handleRenew = () => {
    setTopUp(false);
    setRenew(true);
    setWithdraw(false);
    setOpen(!open);
  };

  const handleChange = (e) => {
    history.push(e.target.value, { id, currency: plan.currency });
  };
  const handleInterval = (e) => {
    setDuration(e.target.value);
  };
  const rollOver = () => {
    const data = {
      id,
      period: duration,
      amount: plan?.availableBalance,
    };
    console.log(data);
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
      {loading ? (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      ) : (
        <>
          <div className="plan__header">
            <BackArrow goBack={history} />
            <h1>{plan?.name}</h1>
            <Link to={`/editplan/${id}`}>
              <MoreVertIcon />
            </Link>
          </div>
          <div className="plan__middle">
            {plan?.amount && <p></p>}
            <div className="plan__balances">
              <div>
                <p>Actual Balance</p>
                {plan.currency} {numberWithCommas(plan?.actualBalance)}
              </div>
              <div>
                <p>Available Balance</p>
                {plan.currency} {numberWithCommas(plan?.availableBalance)}
              </div>
            </div>

            <div className="plan__actions">
              <div>
                <IconButton onClick={handleTopUp}>
                  <AddIcon />
                </IconButton>

                <p>Topup</p>
              </div>

              <div>
                <IconButton
                  disabled={plan.availableBalance === 0}
                  onClick={handleWithdraw}
                >
                  <RemoveIcon />
                </IconButton>

                <p>Withdraw</p>
              </div>

              <div>
                <IconButton
                  disabled={plan.availableBalance === 0}
                  onClick={handleRenew}
                >
                  <AutorenewIcon />
                </IconButton>
                <p>Auto renew</p>
              </div>
            </div>
          </div>
          <div className="plan__body">
            <div className="plan__progressBar">
              {plan?.targetAmount && (
                <ProgressBar
                  amount={plan?.actualBalance}
                  targetAmount={plan?.targetAmount}
                />
              )}
            </div>
            <div className="plan__bodyData">
              {plan?.subscriptions?.length > 0 && (
                <div className="plan__subscriptions">
                  <h1>Subscriptions</h1>
                  <FlipMove>
                    {plan?.subscriptions.map((subscription) => (
                      <Link
                        to={`/subscription/${subscription._id}`}
                        key={subscription._id}
                      >
                        <div className="plan__sub">
                          <div>
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
                {plan?.transactions?.length > 0 ? (
                  <>
                    <h1> Recent Transactions</h1>
                    <FlipMove>
                      {plan?.transactions.map((transaction) => (
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
            <Dialog
              open={open}
              onClose={handleClose}
              className="paymentOptions"
            >
              <DialogContent>
                {topUp && (
                  <RadioButtons
                    onChange={handleChange}
                    options={topUpOptions}
                  />
                )}
                {withdraw && (
                  <RadioButtons
                    onChange={handleChange}
                    options={transferOptions}
                  />
                )}
                {renew && (
                  <>
                    <RadioButtons
                      value={duration}
                      onChange={handleInterval}
                      options={durationOptions}
                    />
                    <div>
                      You will not be able to have access until the maturity
                      date
                    </div>
                    <DialogActions>
                      <Button onClick={handleClose} color="secondary">
                        Disagree
                      </Button>
                      <Button onClick={rollOver} className="editButton">
                        Agree
                      </Button>
                    </DialogActions>
                  </>
                )}
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
