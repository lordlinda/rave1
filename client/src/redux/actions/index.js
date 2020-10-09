import axios from 'axios'
import { toast } from 'react-toastify'

//this written here below are action creators
//they dispatch an action to a reducer with the maatching type
//which reducer alters the state
import {
	SIGN_UP, AUTH_ERROR, SIGN_IN,
	USER_LOADED, SIGN_OUT, GET_TRANSACTIONS,
	GET_TRANSACTION, GET_PLAN, CREATE_PLAN, GET_ALLPLANS, EDIT_PLAN, CANCEL_SUBSCRIPTION,
	MAKE_PAYMENT, CREATE_SUBSCRIPTION,
	SEARCH_TRANSACTIONS
} from './types.js'


export const loadUser = () => async (dispatch) => {
	const token = localStorage.getItem('token')
	axios.defaults.headers.common['Authorization'] = token
	await axios.get('/users/user')
		.then(res => {
			//console.log(res.data.user)
			dispatch({
				type: USER_LOADED,
				payload: res.data.user
			})
			localStorage.setItem('email', res.data.user.email)
			localStorage.setItem('name', res.data.user.username)
		}).catch(err => {
			//console.log(err)
			dispatch({
				type: AUTH_ERROR
			})
		})
}
export const signUp = (user) => async (dispatch) => {
	await axios
		.post('/users/signup', user)
		.then(res => {
			dispatch({
				type: SIGN_UP,
				payload: res.data
			})
			localStorage.setItem('token', res.data.token)
			dispatch(loadUser())

		}).catch(err => {
			toast.error(err.response.data.msg)
			dispatch({
				type: AUTH_ERROR,
				payload: err
			})
		})

}

export const signIn = (user) => async (dispatch) => {
	await axios
		.post('/users/signin', user)
		.then(res => {
			//console.log(res.data.token)
			dispatch({
				type: SIGN_IN,
				payload: res.data
			})
			localStorage.setItem('token', res.data.token)
			dispatch(loadUser())
		}).catch(err => {
			toast.error(err.response.data.msg)
			dispatch({
				type: AUTH_ERROR,
				payload: err
			})
		})

}

export const getTransactions = (filters) => async (dispatch) => {
	await axios
		.post('/transactions', filters)
		.then(res => {
			dispatch({
				type: GET_TRANSACTIONS,
				payload: res.data.transactions
			})

		})
}

export const searchTransactions = (filters) => async (dispatch) => {
	//console.log(filters)
	await axios
		.post('/transactions', filters)
		.then(res => {
			//console.log(res.data)
			dispatch({
				type: SEARCH_TRANSACTIONS,
				payload: res.data.transactions
			})

		})
}

export const getTransaction = (id) => async (dispatch) => {
	//console.log(filters)
	await axios
		.get(`/transactions/${id}`)
		.then(res => {
			//console.log(res.data)
			dispatch({
				type: GET_TRANSACTION,
				payload: res.data.transaction
			})

		})
}

export const getPlan = (id) => async (dispatch) => {
	//console.log(filters)
	await axios
		.get(`/payments/${id}`)
		.then(res => {
			//console.log(res.data)
			dispatch({
				type: GET_PLAN,
				payload: res.data.plan
			})

		})
}
export const getAllPlans = (id) => async (dispatch) => {
	//console.log(filters)
	await axios
		.get(`/payments/`)
		.then(res => {
			//console.log(res.data)
			dispatch({
				type: GET_ALLPLANS,
				payload: res.data.plans
			})

		})
}
export const createPlan = (data) => async (dispatch) => {
	//console.log(filters)
	await axios
		.post('/payments/create', data)
		.then(res => {
			toast.success('Plan has been created sucessfully')
			//console.log(res.data)
			dispatch({
				type: CREATE_PLAN,
				payload: res.data.plan
			})

		}).catch(err => {
			toast.error('Plan with such a name already exists')
		})
}

export const editPlan = (id, data) => async (dispatch) => {
	//console.log(filters)
	await axios
		.put(`/payments/editplan/${id}`, data)
		.then(res => {
			toast.success('Plan has been edited sucessfully')
			//console.log(res.data)
			dispatch({
				type: EDIT_PLAN,

			})

		}).catch(err => {
			toast.error('Plan not updated successfully')
		})
}

export const cancelSubscription = (id, plan) => async (dispatch) => {
	//console.log(filters)
	await axios
		.post(`/payments/cancelSubscription/${id}`, { plan: plan })
		.then(res => {
			toast.success('Congragulations,Subscription cancelled')
			//console.log(res.data)
			dispatch({
				type: CANCEL_SUBSCRIPTION,
			})

		}).catch(err => {
			toast.error('Sorry,Subscription not cancelled')
		})
}

export const signOut = () => dispatch => {
	localStorage.removeItem('email')
	localStorage.removeItem('name')
	dispatch({
		type: SIGN_OUT,
		payload: ''

	})
}

export const makePayment = (data) => async (dispatch) => {
	//console.log(filters)
	await axios
		.post('/payments/makePayment', data)
		.then(res => {
			//console.log(res.data)
			toast.success('Congragulations,Payment Successful')
			dispatch({
				type: MAKE_PAYMENT,
				payload: res.data.msg
			})

		})
}

export const makeSubscription = (data) => async (dispatch) => {
	//console.log(filters)
	await axios
		.post('/payments/makeSubscription', data)
		.then(res => {
			toast.error('Congragulations,Subscription Setup')
			dispatch({
				type: CREATE_SUBSCRIPTION,
				payload: res.data.msg
			})

		})
}