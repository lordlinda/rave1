import React, { useEffect } from 'react'
import { connect } from 'react-redux'


import Button from '../Reusables/Button.js'
import Transaction from './Transaction.js'
import * as actions from '../../redux/actions/index.js'
const TransactionList = (props) => {
  useEffect(() => {
    props.getTransactions()
    /**this list should update whenever the length of transactions changes */
  }, [])
  return (
    <div className='mt-8 mb-10'>
      {/*the plans title*/}
      <div className='flex items-baseline justify-between px-5'>
        <p className='text-xl text-titleGray'>Transactions</p>
        <Button
          href='/transactions'
          title='See All'
          moreStyle='text-lg text-titleLink'
        />
      </div>
      {/*mapout our transactions*/}
      {
        props.loading ?
          <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-400 h-12 w-12"></div>
              <div className
                ="flex-1 space-y-3 py-1">
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div> : null

      }
      {
        props.transactions ?
          props.transactions.slice(0, 2).map(transaction => {
            return <Transaction transaction={transaction} key={transaction._id} />
          })
          : <p>No transactions yet</p>
      }
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    transactions: state.data.transactions,
    loading: state.data.loading
  }
}


export default connect(mapStateToProps, actions)(TransactionList)