import React,{useState,useEffect} from 'react'
import Button from './Reusables/Button.js'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'
import Plan from './Reusables/Plan.js'
import Transaction from './Reusables/Transaction.js'
import {numberWithCommas} from '../helpers/middleware.js'
import Rave from './Rave.js'
const Home=(props)=>{
	const [total,setTotal]=useState(0)
	const [transactions,setTransactions]=useState([])
    const [subscriptions,setSubscriptions]=useState([])
useEffect(()=>{
	props.loadUser()
	getTotal()
	getLatestPyaments()
	getSubscriptions()

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
const getSubscriptions=()=>{
	//this function allows us to filter between subscriptions and one time payments
	const sortedplans = props.plans.filter(plan=>plan.identification === 'recurring bill')
	setSubscriptions(sortedplans)
}

const getLatestPyaments=()=>{
	if(props.history.length >0){
       //in this function we want the latest payments to be on top
	   const sortedPayments = props.history.reverse()
	   setTransactions(sortedPayments)
	}
	
}
	return (  
		<div>
		<div className='py-2'>
		<div className='text-center'>
		<p className='text-2xl'>Total Balance:</p>
		<p className='text-xl text-gray-700 ml-2 mt-0'>UGX {numberWithCommas(total)}</p>
		</div>
		<div className='mt-4'>
		<div className='hidden md:block'>
		<p>Save now</p>
		<Rave />
		</div>
		<div className='flex justify-center md:hidden'>
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
		<div className='mt-6 md:flex' id='both plans and history'>
		<div id='for plans' className='px-2 w-1/2'>
		    <p className='text-xl'>Subscriptions</p>
		    <div className=''>
		    {
		    	subscriptions.length > 0 ? 
		    	
		    		subscriptions.map(plan=>{
		    			return <Plan key={plan._id} plan={plan}/>
		    		})
		    	

		    	:<p>No plans yet</p>

		    }
		    
		    </div>
		    </div>
		    <div className='shadow-lg b-blue-200 w-1/2'>
		    <p>Transactions</p>
		    <table className='table-auto'>
			<thead>

		    <tr>
		      <th className="px-4 py-2">Date</th>
		      <th className="px-4 py-2">amount</th>
		      <th className="px-4 py-2">Payment method</th>
		    </tr>
		  </thead>
		  <tbody>
		  		    {
             transactions.length > 0 ? 
             transactions.map(transaction=>{
		    			return <Transaction key={transaction.transcationId} transaction={transaction}/>
		    		})
             :<tr className="bg-gray-100">
      <td className="border px-4 py-2">You have no transactions yet</td>
    </tr>
		    }
		    </tbody>
		    </table>
		    <Button
		    isButton={true}
		    title='View all transactions'
		    moreStyle='w-full'
		    />
		    </div>

		</div>
		</div>
		</div>
		</div>
		)

}

const mapStateToProps=(state)=>{
 return {
 	plans:state.data.plans,
 	history:state.data.history
 }
}
export default connect(mapStateToProps,actions)(Home)

