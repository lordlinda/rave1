import {USER_LOADED,GET_TRANSACTIONS,SEARCH_TRANSACTIONS} from '../actions/types.js'

const initialState={
	loading:true,
	plans:[],
	transactions:[],
	history:[],
	name:''
}

//the reducer has the inital state and alters it based on the action
export default (state=initialState,action)=>{
	switch(action.type){
		case USER_LOADED:
		return {
			...state,
			loading:false,
			plans:action.payload.paymentPlan,
			name:action.payload.username
		}
		case GET_TRANSACTIONS:
		return {
			...state,
			loading:false,
			transactions:action.payload
		}
		case SEARCH_TRANSACTIONS:
		return{
			...state,
			loading:false,
			history:action.payload
		}
		default:
		return state
	}
}