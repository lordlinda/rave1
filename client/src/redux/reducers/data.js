import {USER_LOADED,GET_TRANSACTIONS,
	SEARCH_TRANSACTIONS,GET_TRANSACTION,GET_ALLPLANS,
	GET_PLAN,CREATE_PLAN} from '../actions/types.js'

const initialState={
	loading:true,
	plans:[],
	transactions:[],
	name:'',
	email:'',
	transaction:{},
	plan:{}
}

//the reducer has the inital state and alters it based on the action
export default (state=initialState,action)=>{
	switch(action.type){
		case USER_LOADED:
		return {
			...state,
			loading:false,
			name:action.payload.username,
		}
		case GET_TRANSACTIONS:
		case SEARCH_TRANSACTIONS:
		return {
			...state,
			loading:false,
			transactions:action.payload
		}
		
		case GET_TRANSACTION:{
			return{
				...state,
			loading:false,
			transaction:action.payload
			}
		}
		case GET_PLAN:{
			return{
				...state,
			loading:false,
			plan:action.payload
			}
		}
		case GET_ALLPLANS:{
			return{
				...state,
			loading:false,
			plans:action.payload
			}
		}
		case CREATE_PLAN:{
			return {
				...state,
				loading:false,
				plans:[action.payload,...state.plans]
			}
		}
		default:
		return state
	}
}