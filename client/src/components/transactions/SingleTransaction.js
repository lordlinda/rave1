import React, { useEffect } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'

import { numberWithCommas } from '../../helpers/middleware.js'
import * as actions from '../../redux/actions/index.js'
import BackArrow from '../Reusables/BackArrow.js'

const Transaction = (props) => {
  const id = props.match.params.id

  useEffect(() => {
    props.getTransaction(id)
  }, [id])
  return (
    <div className='mx-5'>
      <BackArrow href='/transactions' moreStyle='pt-2' />
      {
        props.transaction ?
          <>
            <p className='text-titleDark font-semibold text-4xl mt-10'>{props.transaction.plan}</p>
            <div className='border px-2'>
              <div className='mt-8'>
                <p>Payment method</p>
                <p className='text-2xl text-titleDark'>{props.transaction.paymentMethod}</p>
              </div>
              <div className='mt-2'>
                <p>Date</p>
                <p className='text-2xl text-titleDark'>{Moment(props.transaction.date).format('MMM/DD/YY')}</p>
              </div>
              <div className='mt-2'>
                <p>Amount</p>
                <p className='text-2xl text-amountGreen'>{props.transaction.currency}{numberWithCommas(props.transaction.amount)}</p>
              </div>
            </div>
          </>
          : null
      }


    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transaction: state.data.transaction
  }
}
export default connect(mapStateToProps, actions)(Transaction)