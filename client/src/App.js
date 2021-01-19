import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/main.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import Transactions from "./components/transactions/AllTransactions.js";
import authGuard from "./helpers/auth.js";
import AmountPage from "./components/Amount";
import Dates from "./components/Dates.js";
import AllPlans from "./components/plans/AllPlans.js";
import createPlan from "./components/plans/createPlan.js";
import Plan from "./components/plans/SinglePlan.js";
import editPlan from "./components/plans/editPlan.js";
import Transaction from "./components/transactions/SingleTransaction.js";
import Profile from "./components/profile/Profile";
import ConfirmPage from "./components/ConfirmPage";
import PersonalDetails from "./components/profile/PersonalDetails";
import Contact from "./components/profile/Contact";
import Subscription from "./components/plans/Subscription";
import IntervalPage from "./components/IntervalPage";
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/amount" component={authGuard(AmountPage)} />
            <Route
              exact
              path="/createSubscription"
              component={authGuard(Dates)}
            />
            <Route exact path="/amount/:id" component={authGuard(AmountPage)} />
            <Route
              exact
              path="/createSubscription/:id"
              component={authGuard(Dates)}
            />
            <Route exact path="/createPlan" component={authGuard(createPlan)} />
            <Route exact path="/plan/:id" component={authGuard(Plan)} />
            <Route exact path="/editplan/:id" component={authGuard(editPlan)} />
            <Route
              exact
              path="/transaction/:id"
              component={authGuard(Transaction)}
            />
            <Route exact path="/" component={authGuard(Dashboard)} />
            <Route exact path="/confirm" component={authGuard(ConfirmPage)} />
            <Route exact path="/profile" component={authGuard(Profile)} />
            <Route exact path="/plans" component={authGuard(AllPlans)} />
            <Route exact path="/contact" component={authGuard(Contact)} />
            <Route exact path="/interval" component={authGuard(IntervalPage)} />
            <Route
              exact
              path="/subscription/:id"
              component={authGuard(Subscription)}
            />
            <Route
              exact
              path="/details"
              component={authGuard(PersonalDetails)}
            />
            <Route
              exact
              path="/transactions"
              component={authGuard(Transactions)}
            />
          </Switch>
        </AnimatePresence>
      </Provider>
    </div>
  );
}

export default App;
