import React, { useState } from "react";
import { banks } from "../Reusables/select/Options";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Button, Input, InputLabel } from "@material-ui/core";
import BackArrow from "../Reusables/BackArrow.js";
import { addBankAcct } from "../../redux/actions/transfers";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function Banks(props) {
  const [bank, setBank] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const addBank = () => {
    if (account_number.length < 8 || account_number.length > 16) {
      toast.error("Please enter a valid account number");
    } else {
      const data = {
        account_bank: bank.code,
        account_number,
        account_name: bank.name,
        id: bank.id,
      };
      console.log(data);
      props.addBankAcct(data, props.history);
    }
  };

  return (
    <div className="banks">
      <div className="banks__header">
        <BackArrow goBack={props.history} />
        <h1>Add Bank Account</h1>
      </div>
      <div className="banks__body">
        <FormControl>
          <InputLabel htmlFor="standard-adornment-amount">
            Account Number
          </InputLabel>
          <Input
            type="number"
            aria-describedby="standard-weight-helper-text"
            variant="outlined"
            value={account_number}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
          />
        </FormControl>
        <TextField
          select
          label="Select"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          helperText="Please select your bank"
        >
          {banks.map((bank) => (
            <MenuItem key={bank.id} value={bank}>
              {bank.name}
            </MenuItem>
          ))}
        </TextField>
        <Button className="editButton" onClick={addBank}>
          Add Bank Account
        </Button>
      </div>
    </div>
  );
}

export default connect(null, { addBankAcct })(Banks);
