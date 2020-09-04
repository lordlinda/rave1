import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import './assets/main.css'
import 'react-toastify/dist/ReactToastify.css';

import {Provider} from 'react-redux'
import store from './redux/store.js'
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import Home from './components/Home.js'
import Rave from './components/Rave.js'
import Subscription from './components/Subscription.js'
import authGuard from './helpers/auth.js'
import Navbar from './components/Navbar/Navbar.js'

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <Router>
      <Navbar />
      <ToastContainer />
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/' component={authGuard(Home)}/>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/rave' component={authGuard(Rave)}/>
      <Route exact path='/subscription' component={authGuard(Subscription)}/>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
