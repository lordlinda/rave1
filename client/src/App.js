import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/main.css";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./components/SignIn/Signup.js";
import Signin from "./components/SignIn/Signin.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import Transactions from "./components/transactions/AllTransactions.js";
import authGuard from "./helpers/auth.js";
import AmountPage from "./components/payments/Amount";
import Dates from "./components/payments/Dates.js";
import AllPlans from "./components/plans/AllPlans.js";
import createPlan from "./components/plans/createPlan.js";
import Plan from "./components/plans/SinglePlan.js";
import editPlan from "./components/plans/editPlan.js";
import Transaction from "./components/transactions/SingleTransaction.js";
import Profile from "./components/profile/Profile";
import ConfirmPage from "./components/payments/ConfirmPage";
import PersonalDetails from "./components/profile/PersonalDetails";
import Contact from "./components/profile/Contact";
import Subscription from "./components/plans/Subscription";
import IntervalPage from "./components/payments/IntervalPage";
import LabelBottomNavigation from "./components/Reusables/BottomNavigation";
import Transfers from "./components/transfers/Transfers";
import AccountTransfer from "./components/transfers/AccountTransfer";
import MobileTransfer from "./components/transfers/MobileTransfer";
import BankTransfer from "./components/transfers/BankTransfer";
import AddBank from "./components/transfers/AddBank";
import ForgetPassword from "./components/SignIn/ForgetPassword";
import ResetPassword from "./components/SignIn/ResetPassword";
import Sidebar from "./components/Sidebar/Sidebar";
import { matchPath } from "react-router";
import Maturity from "./components/payments/MaturityDate";
function App(props) {
  const PageRoutes = () => {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={authGuard(Dashboard)} />
          <Route
            exact
            path="/transactions"
            component={authGuard(Transactions)}
          />
          <Route exact path="/transfers" component={authGuard(Transfers)} />
          <Route exact path="/profile" component={authGuard(Profile)} />
          <Route exact path="/plans" component={authGuard(AllPlans)} />
        </Switch>
        <LabelBottomNavigation />
      </div>
    );
  };
  const match = matchPath(props.location.pathname, {
    path: "/users/password/reset/:token",
    exact: true,
    strict: false,
  });

  return (
    <div className="app">
      <ToastContainer />
      <div className="sidebarContainer">
        {props.location.pathname === "/signin" ? null : props.location
            .pathname === "/signup" ? null : props.location.pathname ===
          "/forgetPassword" ? null : match ? null : (
          <Sidebar />
        )}

        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgetPassword" component={ForgetPassword} />
          <Route
            exact
            path="/users/password/reset/:token"
            component={ResetPassword}
          />
          <Route exact path="/amount" component={authGuard(AmountPage)} />
          <Route
            exact
            path="/createSubscription"
            component={authGuard(Dates)}
          />

          <Route exact path="/maturity" component={Maturity} />
          <Route exact path="/createPlan" component={authGuard(createPlan)} />
          <Route exact path="/plan/:id" component={authGuard(Plan)} />
          <Route exact path="/editplan/:id" component={authGuard(editPlan)} />
          <Route
            exact
            path="/transaction/:id"
            component={authGuard(Transaction)}
          />
          <Route exact path="/confirm" component={authGuard(ConfirmPage)} />
          <Route exact path="/contact" component={authGuard(Contact)} />
          <Route exact path="/interval" component={authGuard(IntervalPage)} />
          <Route
            exact
            path="/subscription/:id"
            component={authGuard(Subscription)}
          />
          <Route exact path="/details" component={authGuard(PersonalDetails)} />
          <Route exact path="/account" component={authGuard(AccountTransfer)} />
          <Route exact path="/mobile" component={authGuard(MobileTransfer)} />
          <Route exact path="/bank" component={authGuard(BankTransfer)} />
          <Route exact path="/addBank" component={authGuard(AddBank)} />
          <Route component={PageRoutes} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
