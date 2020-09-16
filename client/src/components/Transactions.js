import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'

import * as actions from '../redux/actions/index.js'
import Select from './Reusables/Select.js'
import Input from './Reusables/Input.js'
import History from './Reusables/History.js'
import Avatar from './Reusables/Avatar.js'
import Navbar from './Navbar/Navbar.js'

const Transactions=(props)=>{
   const [filters,setFilters]=useState({
    paymentMethod:'',
    currency:'',
    from:'',
    to:''
   })
   const {paymentMethod,currency,from,to}=filters;
  const [transactions,setTransactions]=useState([])

  useEffect(()=>{
  /*props.loadUser()*/
  
  props.searchTransactions(filters)
 setTransactions(props.history)
  },[props.history.length,filters])


const handleChange=text=>e=>{
  setFilters({...filters,[text]:e.target.value})
}
const onFocus=(e)=>{
    e.currentTarget.type = "date";
}
const onBlur= (e)=>{
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Enter a Date";
}
	return(
		<div className='px-4 md:mt-3'>
	      	{/*this is displays the title of the page*/}
          <div className='md:flex md:justify-between'>
		      <p className='sd:text-3xl md:py-4 font-bold sd:ml-4 text-xl ml-3 mt-4'>
          <Navbar />
          Transactions</p>
          <Avatar />
        </div>
      {/*for our transaction page we have the filters section and the transaction history section
      on small screens ,the filters is on top of the transaction history and for large screens they are on the side*/}
		    <div>
      {/*filters for small and medium screens*/}
        <div className='sd:flex sd:justify-between sd:items-baseline sd:flex-wrap'>
        <Select 
        value={currency}
        onChange={handleChange('currency')}
        />
        <select 
        name='paymentMethod'
        value={paymentMethod}
        onChange={handleChange('paymentMethod')}
        className='py-1 mt-2 ml-2 rounded-md bg-white border-2'>
        <option value=''>All</option>
        <option>card</option>
        <option>mobile money</option>
        </select>
        <Input 
        type='text' 
        placeholder='From:'
        onfocus={onFocus}
        onblur={onBlur}
        value={from}
        onChange={handleChange('from')}
        moreStyle='py-1 mt-2 ml-2 rounded-md bg-white border-2'
        />

        <Input 
        type='text' 
        placeholder='To:'
        onfocus={onFocus}
        onblur={onBlur}
        value={to}
        onChange={handleChange('to')}
        moreStyle='py-1 mt-2 ml-2 rounded-md bg-white border-2'/>
         

        </div>
         {/*transaction history*/}
        <div className='mt-10'>
          <table className="w-full mt-3 text-sm">
          <tbody>

          {
                transactions.length > 0  ?
                transactions.map(transaction=>{
                  return <History transaction={transaction} key={transaction._id}/>
                })
                :<tr>
                 <td>No history yet</td>
                </tr>

               }
          </tbody>
        </table>
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

export default connect(mapStateToProps,actions)(Transactions)