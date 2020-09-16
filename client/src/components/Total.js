import React, { useState,useEffect } from 'react'
import { numberWithCommas } from '../helpers/middleware.js'
import {connect} from 'react-redux'
import Moment from 'moment';

import * as actions from '../redux/actions/index.js'

const Total = (props) => {
	const [total,setTotal]=useState(0)
	const [amount,setAmount]=useState('')
     const [filters,setFilters]=useState({
     from:Moment().startOf('week').format('YYYY-MM-DD HH:mm'),
     to:Moment().endOf('week').format('YYYY-MM-DD HH:mm'),
     duration:'This week'
   })
     const {duration}=filters
	useEffect(()=>{
		props.searchTransactions(filters)
        getTotal()
		setTotal(props.total)
	},[props.total,filters,props.history.length,amount])

	const getTotal = () => {
 	//console.log(props.history)
        if (props.history.length > 0) {
            let total = 0
            props.history.map(transaction => {
                total += transaction.amount
                setAmount(total)

            })
        }
    }
      const handleChange=e=>{
      	//so basically we want to ensure that for any duration stated in the options 
      	//we can set the start date and end date for the duration chosen by the client and get the the total
        //console.log(e.target.value)
        switch(e.target.value){
          case 'This week':
         return setFilters({
          	...filters,
          	from:Moment().startOf('week').format('YYYY-MM-DD HH:mm'),
          	to:Moment().endOf('week').format('YYYY-MM-DD HH:mm'),
          	duration:e.target.value
          });
          case 'This month':
          return setFilters({
          	...filters,
          	from:Moment().startOf('month').format('YYYY-MM-DD HH:mm'),
          	to:Moment().endOf('month').format('YYYY-MM-DD HH:mm'),
          	duration:e.target.value
          });
          case 'This year':
         return  setFilters({
          	...filters,
          	from:Moment().startOf('year').format('YYYY-MM-DD HH:mm'),
          	to:Moment().endOf('year').format('YYYY-MM-DD HH:mm'),
          	duration:e.target.value
          });
        }

      }
      //console.log(filters)
    return (
        <div>
		<div className=''>
		<p className='text-xs md:text-sm md:uppercase text-purple-400 text-center'>Total Balance</p>
	     {/*we give the total a bigger size for focus and closer to the title*/}
		<p className='text-2xl md:text-3xl -mt-2 text-white text-center font-semibold'>

		<span className='text-xs'>UGX </span>
		{numberWithCommas(total)}</p>
	    {/*we give the intervals more space from the bottom
	    and we give them some distance from the right such that they arent over spaced*/}
		<div className='flex justify-between mt-5 md:mr-18 flex-wrap mt-3 items-baseline md:space-around text-md'>
		<select 
        name='paymentMethod'
        onChange={handleChange}
        className='mt-2 ml-2 rounded-md bg-white border-2 w-1/8 focus:outline-none'>
        <option>This week</option>
        <option>This month</option>
        <option>This year</option>
        </select>
          <div className='text-white'>
          {
          	amount ? 
          	<p className='text-md mt-2 tracking-wide'>You have saved {amount} {duration}</p>
          	:null
          }
          
          </div>
		
		
		</div>
		</div>
		</div>
    )

}

const mapStateToProps=(state)=>{
	return {
    history:state.data.history
	}
}

export default connect(mapStateToProps,actions)(Total)