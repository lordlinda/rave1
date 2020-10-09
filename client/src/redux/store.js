import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk' // no changes here 
import reducer from './reducers/index.js'
import axios from 'axios'
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = token
console.log(token)
const store = createStore(reducer, {
	auth: {
		isAuth: token ? true : false,
		loading: false
	}
}, composeWithDevTools(
	applyMiddleware(ReduxThunk),
	// other store enhancers if any
));

export default store