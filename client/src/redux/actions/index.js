import axios from 'axios'
import {toast} from 'react-toastify'

//this written here below are action creators
//they dispatch an action to a reducer with the maatching type
//which reducer alters the state
import {SIGN_UP,AUTH_ERROR,SIGN_IN,USER_LOADED,SIGN_OUT} from './types.js'
export const loadUser=()=>async (dispatch)=>{
	const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = token 
	await axios.get('/users/user')
            .then(res=>{
              //console.log(res.data.user)
              dispatch({
              	type:USER_LOADED,
              	payload:res.data.user.paymentPlan
              })
            }).catch(err=>{
              console.log(err)
              dispatch({
              	type:AUTH_ERROR
              })
            })
}
export const signUp =(user)=>async (dispatch)=>{
		await axios
				   .post('/users/signup',user)	
				   .then(res=>{
				   	console.log(res.data)
				   	  dispatch({
				   	  	type:SIGN_UP,
				   	  	payload:res.data
				   	  })
				   	   localStorage.setItem('token',res.data.token)
				   	  dispatch(loadUser())
				   	 
				   }).catch(err=>{
				   	toast.error(err.response.data.msg)
				   	dispatch({
				   	  	type:AUTH_ERROR,
				   	  	payload:err
				   	  })
				   })
	
}

export const signIn =(user)=>async (dispatch)=>{
		await axios
				   .post('/users/signin',user)	
				   .then(res=>{
				   	console.log(res.data.token)
				   	  dispatch({
				   	  	type:SIGN_IN,
				   	  	payload:res.data
				   	  })
				   	  localStorage.setItem('token',res.data.token)
				   	  dispatch(loadUser())
				   }).catch(err=>{
				   	toast.error(err.response.data.msg)
				   	dispatch({
				   	  	type:AUTH_ERROR,
				   	  	payload:err
				   	  })
				   })
	
}

export const signOut=()=>dispatch=>{
	dispatch({
		type:SIGN_OUT,
		payload:''

	})
}

