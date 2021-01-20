import React, { useState, useEffect } from "react";
import BackArrow from "../Reusables/BackArrow";
import Input from "../Reusables/Input";
import Button from "@material-ui/core/Button";
import "./editPlan.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { connect } from "react-redux";
import { getPlan, editPlan, deletePlan } from "../../redux/actions/plans";
import DialogTitle from "@material-ui/core/DialogTitle";
function EditPlan(props) {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const id = props.match.params.id;

  const fetchData = async () => {
    await props.getPlan(id);
    setName(props.plan?.name);
    setAmount(props.plan?.targetAmount);
  };
  useEffect(() => {
    fetchData();
  }, [name, id]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    props.deletePlan(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.editPlan({
      id,
      name,
      targetAmount: amount,
    });
    props.history.goBack();
  };
  return (
    <div className="editPlan">
      <div className="editPlan__header">
        <BackArrow goBack={props.history} />
        <h1>Edit Plan</h1>
      </div>
      <form className="editPlan__body" onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          label="Name"
        />
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          label="Target Amount"
        />
        <div className="editPlan__buttons">
          <Button type="submit" variant="contained" className="editButton">
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </div>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure you want to delete the plan?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} className="editButton">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    plan: state.plans.plan,
  };
};
export default connect(mapStateToProps, { getPlan, editPlan, deletePlan })(
  EditPlan
);
