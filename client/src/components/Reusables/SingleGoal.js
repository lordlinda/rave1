import React from 'react'

import {numberWithCommas} from '../../helpers/middleware.js'
import Button from './Button.js'
import {Link} from 'react-router-dom'

const Goal=(props)=>{
  //give the first subscriptions
    //we give a distance from the top one
	return(
    /*didnt use a w-1/2 because of no space between the boxes*/
    <Link to={'/plan/'+props.plan._id}>
		<div className='shadow-planShadow mt-3 px-4 py-2 rounded-buttonRadius mx-2 w-40 h-40'>
    <p className='mt-4 text-2xl'>{props.plan.name}</p>
    <p className='mb-12'>{props.plan.currency}{props.plan.amount}</p>
   </div>
   </Link>
		)
}

export default Goal