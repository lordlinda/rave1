import React, { useState, useEffect } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./transfers.css";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/index";

function Transfers(props) {
  useEffect(() => {
    props.loadUser();
  }, []);
  return (
    <div className="transfers">
      <h1>Transfers</h1>
      <div className="transfers__icons">
        <div>
          <IconButton component={Link} to="/account">
            <ArrowDownwardIcon />
          </IconButton>
          <p>
            Account <br />
            Transfer
          </p>
        </div>
        <div>
          <IconButton component={Link} to="/mobile">
            <SmartphoneIcon />
          </IconButton>
          <p>
            Mobile <br />
            Money
          </p>
        </div>
        <div>
          <IconButton component={Link} to="/bank">
            <AccountBalanceIcon />
          </IconButton>{" "}
          <p>
            Bank <br />
            Transfer
          </p>
        </div>
      </div>

      <div className="transfers__accounts">
        <div className="transfers_accountsHeader">
          <h1>Bank Account</h1>
          <Link to="/addBank">Add </Link>
        </div>
        <div>
          {props.accounts?.map((account) => (
            <div className="bankAcct" key={account.id}>
              <IconButton>
                <AccountBalanceIcon />
              </IconButton>
              <div>
                <p>{account.account_name}</p>
                <span>{account.account_number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    accounts: state.data.user.bankAccounts,
    numbers: state.data.user.phoneNumber,
  };
};
export default connect(mapStateToProps, { loadUser })(Transfers);
