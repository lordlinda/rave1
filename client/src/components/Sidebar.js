import React from 'react'
import Button from './Reusables/Button.js'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'

import * as actions from '../redux/actions/index.js'
const Sidebar=(props)=>{
    //this function helps us to identify the active link
    //in our sidebar
    //we wrap or sidebar with  withRouter to get access to the 
    //props of history and so forth
	const isActive=(history,path)=>{
    if(history.location.pathname === path){
    	return 'text-white bg-purple-400 rounded-r-lg py-2 px-2'
    } else{
    	return ''
    }
	}
	//console.log(props)
	
	return(
		<div className=' hidden md:block'>
	   {/* i place the logo a few pixels from the top*/}
		<p className='text-2xl mt-10 ml-6'>Pasbanc</p>
	   {/* this div below contains all our nav links*/}
		<div className='md:mt-8 md:text-lg'>
	   {/*i add a div around each button to add styles to it*/}
		<div className='md:py-4 md:text-lg'>
		<div className='mt-5'>
            <Button 
            href='/'
            title='Dashboard'
            moreStyle={isActive(props.history,'/')}
            />
            </div>
            <div className='mt-6'>
            <Button title='Transactions'
            href='/transactions'
            moreStyle={isActive(props.history,'/transactions')}
            />
            </div>
            <div className='mt-6'>
            <Button title='Subscriptions'
            href='/subscriptions'
            moreStyle={isActive(props.history,'/subscriptions')}
            />
             </div>
             <div className='mt-6'>
            <Button title='SignOut'
            isButton={true}
            moreStyle='bg-text-400'
            onClick={props.signOut}
            />
             </div>

		</div>
		</div>
		</div>
		)

}

export default compose(connect(null,actions),withRouter)
                        (Sidebar)