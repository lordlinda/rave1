import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import {Link} from 'react-router-dom'

import Total from './Total.js'
import Button from '../Reusables/Button.js'
import Greeting from './Greetings.js'
import Buttons from './PaymentButtons.js'
import Plans from './Plans.js'
import  TransactionList from './TransactionList.js'
import BottomNavigation from '../Reusables/BottomNavigation.js'
const Dashboard=(props)=>{
	return(
		<div className='container mx-auto px-5'>
      <Greeting />
      <Total />
      <Buttons />
      <Plans />
      <TransactionList />
      <BottomNavigation />
	  </div>
		)
}





export default Dashboard