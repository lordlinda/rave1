import React from 'react'

import Total from './Total.js'
import Greeting from './Greetings.js'
import Buttons from './PaymentButtons.js'
import Plans from './Plans.js'
import TransactionList from './TransactionList.js'
const Dashboard = (props) => {
  return (
    <div className='container mx-auto px-5'>
      <Greeting />
      <Total />
      <Buttons />
      <Plans />
      <TransactionList />
    </div>
  )
}





export default Dashboard