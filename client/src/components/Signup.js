import React,{useState} from 'react'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import Input from './Reusables/Input.js'
import Button from './Reusables/Button.js'
import {Redirect} from 'react-router-dom'

import * as actions from '../redux/actions/index.js'
const Signup=(props)=>{
	const [formData,setFormData]=useState({
		username:'',
		email:'',
		password:''
	})
	const {username,email,password}=formData
	const handleChange=text=>e=>{
     setFormData({...formData,[text]:e.target.value})
	}
	const handleSubmit=async(e)=>{
      e.preventDefault()
      console.log(formData)
      //we want to ensure that the user has filled in 
      //all the fields
      if(username&&email&&password){
       //we send the data to the backend
        await props.signUp(formData)
        //if the user is signed in sucessfully we send them to the 
        //home page
        
      }else{
        toast.error('Please fill in all fields')
      }
	}
  
 return (
 	<div className='container mx-auto flex justify-center mt-12'>
  {
    props.isAuth ?
    <Redirect to='/'/>
    :null
  }
 	 <div className='shadow-lg px-6 py-12 border'>
 	 <h1 className='text-center text-2xl text-indigo-500 mb-5'>Signup with us!</h1>
 	 <form onSubmit={handleSubmit}>
      <Input
      type='text'
      title='Username'
      value={username}
      onChange={handleChange('username')}
       />
        <Input
      type='email'
      title='Email'
      value={email}
      onChange={handleChange('email')}
       />
       <Input
      type='password'
      title='Password'
      value={password}
      onChange={handleChange('password')}
       />
       <Button
       isButton={true}
       type='submit'
       title='Signup' 
       moreStyle='w-full leading-wider bg-indigo-400 rounded-sm py-1 text-white shadow-md'/>
       </form>
       <div className='flex mt-5 text-sm'>
       <span className='text-gray-500'>Already have an account ?</span>
       <Button
       title='Signin'
       moreStyle='text-blue-600'
       href={'/signin'}
       />
       </div>
 	 </div>
 	</div>
 	)
}
const mapStateToProps=(state)=>{
 return {
 	isAuth:state.auth.isAuth,
 	name:state.auth.name
 }
}
export default connect(mapStateToProps,actions)(Signup)