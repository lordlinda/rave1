import React from 'react'
import Moment from 'moment';
import {numberWithCommas} from '../../helpers/middleware.js'

const Transaction=(props)=>{
	return(

          <tr className=''>
      <td className=" px-5 py-2">{Moment(props.transaction.date).format('LL')}</td>
      <td className=" px-2 py-2">{props.transaction.currency}{numberWithCommas(props.transaction.amount)}</td>
      <td className=" px-5 py-2">{props.transaction.paymentMethod}</td>
    </tr>
		)
}

export default Transaction