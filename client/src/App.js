import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import './assets/main.css'
import 'react-toastify/dist/ReactToastify.css';

import {Provider} from 'react-redux'
import store from './redux/store.js'
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import Home from './components/Home.js'
import Transactions from './components/Transactions.js'
import Subscriptions from './components/Subscriptions.js'
import authGuard from './helpers/auth.js'
import Sidebar from './components/Sidebar.js'

const defaultContainer =()=>(
     <div className='flex h-screen'>
     {/*we give a height of the full screen*/}
     <div 
     style={{backgroundColor:'#f7f9f8'}}
     className='h-screen'>
       <Sidebar />
       </div>
       {/*we give a height of the full screen
       and the width it occupies is 100% of its part in the flex container and a curve to the left*/}
       <div className='w-full h-screen md:rounded-l-curve'>
       <Route exact path='/' component={authGuard(Home)}/>
      <Route exact path='/transactions' component={authGuard(Transactions)}/>
      <Route exact path='/subscriptions' component={authGuard(Subscriptions)}/>
      </div>
  </div>
)

const loginContainer=()=>(
<div>
    <Route exact path='/signin' component={Signin}/>
</div>
)

const signUpContainer=()=>(
<div>
    <Route exact path='/signup' component={Signup}/>
</div>
)
function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <ToastContainer />
      <Router>
      <Switch>
      <Route exact path='/signin' component={loginContainer} />
      <Route exact path='/signup' component={signUpContainer} />
      <Route exact component={defaultContainer} />
      </Switch>
      </Router>

      </Provider>
    </div>
  );
}

export default App;
