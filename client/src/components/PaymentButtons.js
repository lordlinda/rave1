import React from 'react'
import Button from './Reusables/Button.js'
const Buttons =()=>{
	return (
		<div className='flex items-baseline mt-5 justify-between'>
		<Button 
		href='/rave'
		title='Save Now'
		moreStyle='shadow-buttonShadow text-customPurple py-3 rounded-buttonRadius px-4'
		/>
		<Button 
		href='/createSubscription'
		title='Automatic savings'
		moreStyle='shadow-buttonShadow text-customPurple py-3 rounded-buttonRadius px-4'
		/>
		</div>
		)
} 

export default Buttons