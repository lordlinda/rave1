import React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import Input from '../Reusables/Input.js'
import Button from '../Reusables/Button.js'
import BackArrow from '../Reusables/BackArrow.js'
import * as actions from '../../redux/actions/index.js'

class createPlan extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			targetAmount: '',
			description: ''

		}
	}
	handleChange = (text) => e => {
		this.setState({ ...this.state, [text]: e.target.value })
	}
	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.name) {
			this.props.createPlan(this.state)
			this.setState({
				name: '',
				targetAmount: '',
				description: ''
			})
		} else {
			toast.error('Please fill in the name field')
		}

	}
	render() {
		return (
			/*some distance from the top*/
			<div className='mx-5'>
				<BackArrow href='/plans' moreStyle='pt-2' />
				<p className='text-center mt-12 text-2xl text-titleLink'>Create Plan</p>
				<form onSubmit={this.handleSubmit}>
					<div className='mx-5'>

						<Input
							title='Name'
							value={this.state.name}
							onChange={this.handleChange('name')}
							type='text'
							moreStyle='border-b w-full'
						/>
						<Input
							title='Target Amount -optional'
							value={this.state.targetAmount}
							onChange={this.handleChange('targetAmount')}
							type='number'
							moreStyle='border-b w-full'
							labelStyle='mt-5'
						/>
						<Input
							title='Description -optional'
							value={this.state.description}
							onChange={this.handleChange('description')}
							type='text'
							moreStyle='border-b w-full'
							labelStyle='mt-5'
						/>
					</div>
					<Button
						type='submit'
						isButton={true}
						title='Save Plan'
						moreStyle='bg-titleDark text-white mt-12 py-1 font-medium px-5 rounded-md w-full'
					/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		plan: state.data.plan
	}
}
export default connect(mapStateToProps, actions)(createPlan)