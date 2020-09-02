import {combineReducers} from 'redux'
import authReducer from './auth.js'
//this is referred to as the auth reducer because it is where we keep all our
//reducers and combine them to form one
export default combineReducers({
	auth:authReducer
})