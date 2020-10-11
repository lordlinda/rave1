import React, { useEffect } from 'react'
import { connect } from 'react-redux'


import Transaction from '../dashboard/Transaction.js'
import * as actions from '../../redux/actions/index.js'
import Navbar from '../Navbar/Navbar'
import FilterInput from './FilterInput'

const Transactions = (props) => {




  useEffect(() => {
    props.getTransactions()
  }, [])
  return (
    <div className='mx-5'>
      {/*this is displays the title of the page*/}
      <div className='mt-8'>
        <div className='text-xl text-titleLink'>
          <Navbar />
          All Transactions</div>
        <FilterInput />
        <div>
          {
            props.transactions ?
              props.transactions.map(transaction => {
                return <Transaction transaction={transaction} key={transaction._id} />
              })
              : <tr>
                <td>No transactions yet</td>
              </tr>

          }
        </div>
      </div>


    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    transactions: state.data.transactions
  }
}

export default connect(mapStateToProps, actions)(Transactions)