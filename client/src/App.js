import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import './assets/main.css'
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux'
import store from './redux/store.js'
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import Dashboard from './components/dashboard/Dashboard.js'
import Transactions from './components/transactions/AllTransactions.js'
import authGuard from './helpers/auth.js'
import Rave from './components/Rave.js'
import createSubscription from './components/CreateSubscription.js'
import AllPlans from './components/plans/AllPlans.js'
import createPlan from './components/plans/createPlan.js'
import Plan from './components/plans/SinglePlan.js'
import editPlan from './components/plans/editPlan.js'
import Transaction from './components/transactions/SingleTransaction.js'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/rave' component={authGuard(Rave)} />
            <Route exact path='/createSubscription' component={authGuard(createSubscription)} />
            <Route exact path='/rave/:id' component={authGuard(Rave)} />
            <Route exact path='/createSubscription/:id' component={authGuard(createSubscription)} />
            <Route exact path='/createPlan' component={authGuard(createPlan)} />
            <Route exact path='/plan/:id' component={authGuard(Plan)} />
            <Route exact path='/editplan/:id' component={authGuard(editPlan)} />
            <Route exact path='/transaction/:id' component={authGuard(Transaction)} />
            <Route exact path='/' component={authGuard(Dashboard)} />
            <Route exact path='/plans' component={authGuard(AllPlans)} />
            <Route exact path='/transactions' component={authGuard(Transactions)} />
          </Switch>
        </Router>

      </Provider>
    </div>
  );
}

export default App;
