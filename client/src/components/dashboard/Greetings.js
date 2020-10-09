import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Button from '../Reusables/Button.js'
import * as actions from '../../redux/actions/index.js'
import Navbar from '../Navbar/Navbar'

const Greeting = (props) => {
	const [name, setName] = useState('')

	useEffect(() => {
		setName(localStorage.name)
	}, [localStorage.name])

	const signout = () => {
		props.signOut()
	}
	return (
		<div className='mt-5 flex justify-between items-baseline'>
			{/*some distance from the top*/}
			<div className='text-3xl ml-2'>
				<Navbar /> Hello {name}</div>
			<Button
				isButton={true}
				title='LogOut'
				onClick={signout}
				moreStyle='text-titleGray'
			/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		name: state.data.name
	}
}
export default connect(mapStateToProps, actions)(Greeting)