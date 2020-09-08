import {USER_LOADED} from '../actions/types.js'

const initialState={
	loading:true,
	plans:[],
	history:[]
}

//the reducer has the inital state and alters it based on the action
export default (state=initialState,action)=>{
	switch(action.type){
		case USER_LOADED:
		return {
			...state,
			loading:false,
			plans:action.payload.paymentPlan,
			history:action.payload.history
		}
		default:
		return state
	}
}