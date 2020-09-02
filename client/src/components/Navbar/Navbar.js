import React from 'react'
import {connect} from 'react-redux'
import Button from '../Reusables/Button.js'
import * as actions  from '../../redux/actions/index.js'

const Navbar=(props)=>{
const signout=()=>{
	props.signOut()
}
console.log(props)

	return(
		<div className='bg-purple-900 py-2 text-white'>
		<nav className='flex justify-between px-3'>
		<div className='text-xl'>
		   Pbwealth
		</div>
		<Button
		isButton={true}
		onClick={signout}
		title='Signout'
		/>
		</nav>
		</div>
		)
}

export default connect(null,actions)(Navbar)