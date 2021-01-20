import { Button, DialogContent } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import "./subscription.css";
import BackArrow from "../Reusables/BackArrow";
import { connect } from "react-redux";
import { deleteSubscription, getSubscription } from "../../redux/actions/plans";
import {
  updateSubscription,
  cancelSubscription,
  activateSubscription,
} from "../../redux/actions/payments";
import moment from "moment";
import { calculateDueDate } from "../../helpers/middleware";
import Input from "../Reusables/Input";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";

function Subscription(props) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    subscAmt: "",
    interval: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(false);
    setDeactivate(false);
    setDeleted(false);
    setOpen(false);
  };
  const id = props.match.params.id;
  const fetchData = async () => {
    await props.getSubscription(id);
    if (props.subscription.status) {
      await setChecked(props.subscription?.status !== "inactive");
    }

    await setFormData({
      ...formData,
      startDate: props.subscription?.startDate,
      endDate: props.subscription?.endDate,
      interval: props.subscription.interval,
      subscAmt: props.subscription.subscAmt,
    });
  };
  const { startDate, endDate, interval, subscAmt } = formData;
  useEffect(() => {
    fetchData();
  }, [props.subscription.startDate]);

  const handleChange = () => {
    if (checked === true) {
      setDeactivate(true);
      handleClickOpen();
    } else {
      setChecked(true);
      props.activateSubscription(id);
    }

    /**function to deactivate/cancel subscrition */
  };
  const onDelete = () => {
    setDeleted(true);
    handleClickOpen();
  };
  const deleteSubscription = () => {
    handleClose();
    props.deleteSubscription(id);
    props.history.goBack();
  };
  const deactivateSubscription = () => {
    handleClose();
    props.cancelSubscription(id);
    setChecked(!checked);
  };
  const editSubscription = () => {
    setEdit(true);
    handleClickOpen();
  };
  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const updateSubscription = () => {
    handleClose();
    props.updateSubscription({ id, ...formData });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="subscription"
    >
      {props.loading ? (
        <div className="plan__loading">
          <PulseLoader color={"#613eea"} />
        </div>
      ) : (
        <>
          <div className="subscription__top">
            <BackArrow goBack={props.history} />
            <h1>Subscription</h1>
          </div>
          <div className="subscription__header">
            <div>
              <p>Next Due</p>
              <p>
                {props.subscription.startDate &&
                  moment(
                    calculateDueDate({
                      startDate: props.subscription?.startDate,
                      endDate: props.subscription?.endDate,
                      count: props.subscription?.count,
                      interval: props.subscription?.interval,
                    }).dueDate
                  ).format("DD MMM YYYY")}
              </p>
            </div>
            <div>
              <div>
                <p>Start Date</p>
                <p>{moment(startDate).format("DD MMM YYYY")}</p>
              </div>
              <div>
                <p>End Date</p>
                <p>{moment(endDate).format("DD MMM YYYY")}</p>
              </div>
            </div>
          </div>
          <div className="subscription__details">
            <div>
              <p>Recurring</p>
              <Switch
                checked={checked}
                onChange={handleChange}
                color="primary"
              />
            </div>
            <div>
              <p>Amount</p>
              <p>
                {props.subscription.currency} {subscAmt}
              </p>
            </div>
            <div>
              <p>Interval</p>
              <p>{interval}</p>
            </div>
          </div>
          <div className="subscription__buttons">
            <Button
              variant="contained"
              className="editButton"
              onClick={editSubscription}
            >
              Edit
            </Button>
            <Button onClick={onDelete} color="secondary">
              Delete
            </Button>
          </div>
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        {deleted && (
          <DialogTitle>
            {"Are you sure you want to delete this subscription?"}
          </DialogTitle>
        )}
        {deactivate && (
          <DialogTitle>
            {"Are you sure you want to deactivate this subscription?"}
          </DialogTitle>
        )}
        {edit && (
          <DialogContent>
            <form className="subscription__form">
              <Input
                type="date"
                label="Start Date"
                value={moment(startDate).format("YYYY-MM-DD")}
                name="startDate"
                onChange={handleDataChange}
                disabled={props.subscription.status !== "inactive"}
              />
              <Input
                type="date"
                label="End Date"
                name="endDate"
                value={moment(endDate).format("YYYY-MM-DD")}
                onChange={handleDataChange}
              />
              <Input
                type="text"
                label="Interval"
                name="interval"
                value={interval}
                onChange={handleDataChange}
              />
              <Input
                type="number"
                label="Amount"
                name="subscAmt"
                value={subscAmt}
                onChange={handleDataChange}
              />
            </form>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          {deleted && (
            <Button onClick={deleteSubscription} color="secondary">
              Delete
            </Button>
          )}
          {deactivate && (
            <Button onClick={deactivateSubscription} color="secondary">
              Deactivate
            </Button>
          )}
          {edit && (
            <Button
              variant="contained"
              className="editButton"
              onClick={updateSubscription}
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

const mapStateToProps = (state) => {
  return {
    subscription: state.plans.subscription,
    loading: state.plans.isSubscriptionLoading,
  };
};
export default connect(mapStateToProps, {
  updateSubscription,
  getSubscription,
  deleteSubscription,
  cancelSubscription,
  activateSubscription,
})(Subscription);
