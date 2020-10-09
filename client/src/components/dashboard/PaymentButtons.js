import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../Reusables/Button.js'

const Buttons = (props) => {
	return (
		<div className='flex items-baseline mt-5 justify-between'>
			<Button
				isButton={true}
				title='Save Now'
				moreStyle='shadow-buttonShadow text-customPurple py-3 rounded-buttonRadius px-4 transition duration-500 ease-in-out bg-blue-500 transform hover:-translate-y-1 hover:scale-100'
				onClick={() => props.history.push('/rave')}
			/>
			<Button

				title='Automate savings'
				isButton={true}
				moreStyle='shadow-buttonShadow text-customPurple py-3 rounded-buttonRadius px-4 transition duration-500 ease-in-out bg-blue-500 transform hover:-translate-y-1 hover:scale-100'
				onClick={() => props.history.push('/createSubscription')}
			/>
		</div>
	)
}

export default withRouter(Buttons)