import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'


import Button from './Reusables/Button.js'
import Transaction from './Reusables/Transaction.js'
import * as actions from '../redux/actions/index.js'
const TransactionList=(props)=>{
 useEffect(()=>{
  props.getTransactions()
 },[])
	return(
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
       props.transactions ?
       props.transactions.slice(0,2).map(transaction=>{
       return <Transaction transaction={transaction} key={transaction._id}/>
       })
       :<p>No transactions yet</p>
      }
		</div>
		)

}

const mapStateToProps=(state)=>{
 return {
  transactions:state.data.transactions
 }
}


export default connect(mapStateToProps,actions)(TransactionList)