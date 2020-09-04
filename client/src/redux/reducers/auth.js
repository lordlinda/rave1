import {SIGN_UP,AUTH_ERROR,SIGN_IN,SIGN_OUT} from '../actions/types.js'

const initialState={
	isAuth:false,
	loading:true,
}

//the reducer has the inital state and alters it based on the action
export default (state=initialState,action)=>{
	switch(action.type){
		case SIGN_UP:
		case SIGN_IN:
		return {
			...state,
			isAuth:true,
			loading:false,
		}
		case AUTH_ERROR:
		return{
			...state,
			isAuth:null,
			loading:false
		}
		case SIGN_OUT:
		localStorage.removeItem('token')
		return {
        ...state,
			isAuth:null,
			loading:false
		}
		default:
		return state
	}
}