import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk' // no changes here 
import reducer from './reducers/index.js'
import axios from 'axios'
const token = localStorage.getItem('token')
console.log(token)
axios.defaults.headers.common['Authorization'] = token
const store = createStore(reducer, {
	auth: {
		isAuth: token ? true : false,
		loading: true
	}
}, composeWithDevTools(
	applyMiddleware(ReduxThunk),
	// other store enhancers if any
));

export default store