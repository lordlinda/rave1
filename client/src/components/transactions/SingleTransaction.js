import React, { useEffect } from "react";
import Moment from "moment";
import { connect } from "react-redux";

import * as actions from "../../redux/actions/index.js";
import BackArrow from "../Reusables/BackArrow.js";
import moment from "moment";
const Transaction = (props) => {
  const id = props.match.params.id;

  useEffect(() => {
    props.getTransaction(id);
  }, [id]);

  return (
    <div>
      <BackArrow goBack={props.history} />
      <div className="transaction">
        <h1>{props.transaction?.paymentPlan?.name}</h1>
        <p className="transaction__amount">
          {props.transaction.currency} {props.transaction.amount}
        </p>
        <p className="transaction__date">
          {moment(props.transaction.createdAt).format("DD MMM YYYY")}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transaction: state.data.transaction,
  };
};
export default connect(mapStateToProps, actions)(Transaction);
