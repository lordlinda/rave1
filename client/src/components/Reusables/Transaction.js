import React from 'react'
import Button from './Button.js'
import {toast} from 'react-toastify'
import Moment from 'moment';
import {numberWithCommas} from '../../helpers/middleware.js'
import Input from './Input.js'

const Transaction=(props)=>{
	return(
         <tr className=''>
            <td className='px-4 py-2'>{props.transaction.date}</td>
            <td className='px-4 py-2'>{numberWithCommas(props.transaction.amount)}</td>
             <td className=' px-4 py-2'>{props.transaction.paymentMethod}</td>
         </tr>
		)
}

export default Transaction