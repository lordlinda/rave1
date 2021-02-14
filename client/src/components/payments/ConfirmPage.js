import { Button, Divider } from "@material-ui/core";
import React from "react";
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import { connect } from "react-redux";
import {
  getPaymentPlan,
  schedulePayment,
  makePayment,
} from "../../redux/actions/payments";
import BackArrow from "../Reusables/BackArrow.js";
import "./confirmPage.css";
import { numberWithCommas } from "../../helpers/middleware";
import { PulseLoader } from "react-spinners";
import moment from "moment";
import { calculateDuration } from "../../helpers/middleware";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Processor from "../Reusables/Processor";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txref: Date.parse(new Date()),
      customer_email: "user@example.com",
      amount: "",
      currency: "",
      PBFPubKey: "FLWPUBK_TEST-a1165663c59d9f42fa25fb408495447b-X",
      production: false,
      payment_options: "",
      payment_plan: "",
      open: false,
      loading: false,
      onSuccess: (response) => {
        document
          .getElementsByName("checkout")[0]
          .setAttribute(
            "style",
            "position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;"
          );

        const data = {
          amount: response.tx.amount,
          subscAmt: this.props.location.state.amount,
          startDate: this.props.location.state.start,
          endDate: this.props.location.state.end,
          interval: this.props.location.state.interval,
          txRef: response.tx.txRef,
          flwRef: response.tx.flwRef,
          currency: this.props.location.state.currency,
          subscId: response.tx.paymentPlan,
          transactionId: response.tx.id,
          paymentType: response.tx.paymentType.slice(0, 11),
          id: this.props.location.state.id,
          period: this.props.location.state.period,
        };

        if (this.props.location.state.start) {
          this.props.schedulePayment(data, this.props.history);
        } else {
          this.props.makePayment(data, this.props.history);
        }
      },
      onClose: () => {
        console.log("closed");
      },
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChangePayment = (e) => {
    this.setState({ payment_options: e.target.value });
  };

  async componentDidMount() {
    /**check if we have a start date */
    if (
      this.props.location.state.start &&
      moment(this.props.location.state.start).format("DD MMM YYYY") ===
        moment().format("DD MMM YYYY")
    ) {
      this.setState({ loading: true });
      /**calculate duration */
      const { duration } = await calculateDuration({
        startDate: this.props.location.state.start,
        endDate: this.props.location.state.end,
        interval: this.props.location.state.interval,
      });

      /**next we need to make an api request to flutterwave to make a payment plan */
      await this.props.getPaymentPlan({
        currency: this.props.location.state.currency,
        amount: this.props.location.state.amount,
        interval: this.props.location.state.interval,
        name: this.props.location.state.name
          ? this.props.location.state.name
          : "Wallet",
        duration,
      });
      if (this.props.id) {
        this.setState({ loading: false });
        /**after getting the payment id we make the payment */
        this.setState({
          payment_plan: this.props.id,
          amount: this.props.location.state.amount,
          currency: this.props.location.state.currency,
          customer_email: localStorage.email,
        });
      }
    } else if (moment(this.props.location.state.start) > moment()) {
      this.setState({ open: true });
      /**amount will be the 10 ,they choose */
      this.setState({
        amount: 10,
        currency: this.props.location.state.currency,
        customer_email: localStorage.email,
      });
    } else {
      /**if it is a single payment,then we dont need to add a payment plan */
      this.setState({
        amount: this.props.location.state.amount,
        currency: this.props.location.state.currency,
        customer_email: localStorage.email,
      });
    }
  }
  render() {
    return (
      <div className="confirmPage">
        {this.props.loading ? (
          <div className="plan__loading">
            <PulseLoader color={"#613eea"} />
          </div>
        ) : (
          <>
            <div className="confirmPage__header">
              <BackArrow goBack={this.props.history} />
              <h1>Confirm</h1>
            </div>
            <div className="confirmPage__body">
              <div className="confirmPage__details">
                {this.props.location.state?.start && (
                  <>
                    <p>Start Date</p>
                    <p>
                      {moment(this.props.location.state?.start).format(
                        "DD MMM YYYY"
                      )}
                    </p>
                  </>
                )}
                {this.props.location.state?.end &&
                  this.props.location.state?.start && (
                    <>
                      <p>End Date</p>
                      <p>
                        {moment(this.props.location.state?.end).format(
                          "DD MMM YYYY"
                        )}
                      </p>
                    </>
                  )}
                {this.props.location.state?.interval && (
                  <>
                    <p>Interval</p>
                    <p>{this.props.location.state?.interval}</p>
                  </>
                )}
                <div>
                  <p>Amount</p>
                  <p>
                    {this.props.location.state?.currency}{" "}
                    {numberWithCommas(this.props.location.state?.amount)}
                  </p>
                </div>
                <div>
                  <p>Charges</p>
                  <p>0.00</p>
                </div>
                <Divider variant="middle" />
                <div>
                  <p>Total</p>
                  <p>
                    {this.props.location.state?.currency}{" "}
                    {numberWithCommas(this.props.location.state?.amount)}
                  </p>
                </div>
              </div>
              <div className="confirmPage__paymentOptions">
                <h1> Choose a payment method</h1>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="payment_options"
                    name="payment_options"
                    value={this.state.payment_options}
                    onChange={this.handleChangePayment}
                  >
                    {!this.props.location.state.start && (
                      <FormControlLabel
                        value="mobilemoneyuganda"
                        control={<Radio />}
                        label="Mobile Money"
                      />
                    )}

                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Card"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {this.state.payment_options && (
                <div className="confirmPage__button">
                  <RaveProvider {...this.state}>
                    <RavePaymentButton
                      type="submit"
                      disabled={this.state.loading}
                    >
                      Pay
                    </RavePaymentButton>
                  </RaveProvider>
                </div>
              )}

              {this.props.complete && (
                <Processor text="Payment is being processed,please wait" />
              )}
            </div>
          </>
        )}

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>
            {`To verify your card ${this.props.location.state.currency} 10 will be charged to your card and saved to your plan`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="secondary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} className="editButton">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    id: state.payment.id,
    loading: state.data.isLoading,
    complete: state.payment.paymentComplete,
  };
};
export default connect(mapStateToProps, {
  getPaymentPlan,
  schedulePayment,
  makePayment,
})(Subscription);
