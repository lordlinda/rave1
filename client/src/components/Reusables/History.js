import React from 'react'
import Moment from 'moment';
import {numberWithCommas} from '../../helpers/middleware.js'

const History=(props)=>{
	return(
          <tr className='flex justify-between mt-4'>
        <td className="">{Moment(props.transaction.date).format('LL')}</td>
        <td className="">{props.transaction.paymentMethod}</td>
       <td className="">
       {/*on small screens the amount and currency is one while on medium and large screens the currecncy is a different part*/}
       <span className='inline-block md:hidden'>{props.transaction.currency}</span>
       {numberWithCommas(props.transaction.amount)}
       </td>
        <td className="hidden md:block">{props.transaction.currency}</td>
    </tr>
		)
}

export default History