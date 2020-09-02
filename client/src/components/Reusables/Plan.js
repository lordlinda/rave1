import React from 'react'
import Button from './Button.js'
import axios from 'axios'
import {toast} from 'react-toastify'
const Plan=(props)=>{
	const cancelSubscription=(plan)=>{
      console.log(plan)
      axios.post(`http://localhost:5000/payments/cancelSubscription/${plan._id}`,{plan:plan.planId})
           .then(res=>{
            console.log('hello')
            toast.sucess('Unsubscribed from plan')
           })
    }
    //console.log(props)
    const duration=(id)=>{
      //console.log(id)
      switch(id){
        case 6872:
        return 'daily';
        case 6873:
        return 'hourly';
        default:
        return ''
      }
    }
	return(
		<div className='border shadow-lg px-6 py-2 mt-4 md:w-1/2'>
      <div className='flex justify-between px-4 md:flex-wrap'>
           <div className='md:mr-2'>
           <label className='text-2xl md:text-xl'>Amount:</label>
           <p className='text-xl text-gray-800 md:text-sm'>UGX {props.plan.amount}</p>
           </div>
           <div className='md:block px-2'>
           <label className='text-xl text-gray-700 md:text-sm'>Plan type:</label>
           <p className='text-gray-600'>{props.plan.identification}</p>
           {
            props.plan.planId ?
            <Button 
        isButton={true}
        onClick={cancelSubscription.bind(this,props.plan)} 
        title='Cancel Subscription'
        moreStyle='bg-red-500 text-white rounded-lg mt-4 py-1 px-8 md:mt-6'/>
            :null
           }
           </div>
           </div>
           {
            props.plan.planId ?
            <div className='md:block px-2 flex items-center -mt-8'>
           <label className='text-xl text-gray-700 md:text-sm px-2'>Duration:</label>
           <p className='text-gray-600'>{duration(props.plan.planId)}</p>
           </div>
           :null
           }
           
           
		</div>
		)
}

export default Plan