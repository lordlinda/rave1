import {SIGN_UP,AUTH_ERROR,SIGN_IN,USER_LOADED,SIGN_OUT} from '../actions/types.js'

const initialState={
	name:'',
	email:'',
	isAuth:false,
	loading:true,
	plans:[]
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
			name:action.payload.name,
			email:action.payload.email
		}
		case AUTH_ERROR:
		return{
			...state,
			isAuth:null,
			loading:false
		}
		case USER_LOADED:
		return {
			...state,
			isAuth:true,
			loading:false,
			plans:action.payload
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