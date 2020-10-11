import React from 'react'
import Moment from 'moment';
import { numberWithCommas } from '../../helpers/middleware.js'
import { Link } from 'react-router-dom'


const Transaction = (props) => {
  /**i want this component to be able to update when the quantity changes */
  return (
    <Link to={'/transaction/' + props.transaction._id}>
      <div className='shadow-planShadow mt-3 px-4 py-2 rounded-lg'>
        <div className='flex justify-between'>
          <div>
            <p className='text-titleDark font-semibold text-xl'>{props.transaction.paymentPlan ? props.transaction.paymentPlan.name : 'Transaction'}</p>
            {/*we display the installment amount and the due date next to each other*/}
            <div>
              <p className='mt-3 text-dateGray'>{Moment(props.transaction.date).format('MMM/DD/YY')}</p>
            </div>
          </div>
          <div>
            <p className='text-amountGreen'>{props.transaction.currency}{numberWithCommas(props.transaction.amount)}</p>

          </div>
        </div>
      </div>
    </Link>
  )
}

export default Transaction