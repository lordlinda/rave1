import React,{useState,useEffect} from 'react'
import Button from './Reusables/Button.js'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'
import Plan from './Reusables/Plan.js'
import {numberWithCommas} from '../helpers/middleware.js'

const Home=(props)=>{
	const [total,setTotal]=useState(0)

useEffect(()=>{
	props.loadUser()
	getTotal()

},[props.plans])

const getTotal=()=>{
 if(props.plans.length > 0){
 	let total=0
 	props.plans.map(plan=>{
 		total +=plan.amount
 		setTotal(total)

 	})
 	//console.log(total)
	}
}
	return (  
		<div>
		<div className='px-4 py-2 mb-5 md:mx-auto md:container lg:px-32'>
		<div className='text-center'>
		<p className='text-2xl'>Total Balance:</p>
		<p className='text-xl text-gray-700 ml-2 mt-0'>UGX {numberWithCommas(total)}</p>
		</div>
		<div className='mt-4'>
		<div className='flex justify-center'>
	        <Button
	          href='/rave'
	          title='Save now'
	          moreStyle='bg-purple-800 text-white px-2 py-1 rounded-lg block'
	         />
	          
	         
	        <Button
	          href='/subscription'
	          title='Automatic savings'
	          moreStyle='bg-purple-800 text-white px-2 py-1 rounded-lg mt-4 block ml-2'
	         />
		</div>
		<div className='mt-6'>
		    <p className='text-2xl'>Plans</p>
		    <div className='md:flex md:flex-wrap md:justify-between'>
		    {
		    	props.plans.length ? 
		    	
		    		props.plans.map(plan=>{
		    			return <Plan key={plan._id} plan={plan}/>
		    		})
		    	

		    	:<p>No plans yet</p>

		    }
		    
		    </div>

		</div>
		</div>
		</div>
		</div>
		)

}

const mapStateToProps=(state)=>{
 return {
 	plans:state.data.plans
 }
}
export default connect(mapStateToProps,actions)(Home)

