import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar'
const Greeting = (props) => {
	const [name, setName] = useState('')

	useEffect(() => {
		setName(localStorage.name)
	}, [])

	return (
		<div>
			{/*some distance from the top*/}
			<div className='mt-5 text-3xl ml-2'>
				Hello {name}</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		name: state.data.name
	}
}
export default connect(mapStateToProps)(Greeting)