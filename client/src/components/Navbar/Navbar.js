import React,{useState} from 'react'
import {connect} from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles'
import {compose} from 'redux'


import Button from '../Reusables/Button.js'
import * as actions  from '../../redux/actions/index.js'


const styles ={
	root:{
		marginTop:'50px'
	}
}
const Navbar=(props)=>{
	const[open,setOpen]=useState(false)
	const handleToggle=()=>{
    setOpen(!open)
	}

const signout=()=>{
	props.signOut()
}
//console.log(props)
 const {classes}=props
	return(
		<div className='block md:hidden'>
		{/*this is the navbar that shows on small screens instaed of the sidebar*/}
		<div className='' onClick={handleToggle}><MenuIcon/></div>
		<div >
		<Drawer
        anchor="left"
        open={open}
        onClose={handleToggle}
        
      >
        <div />
          {/*this allows the title to be bigger on small screens and the margin left ligns it up with
         the list items and margin-top gives us some distance from the top of the screen*/}
        <p className='text-xl px-4 mt-10 ml-3'>Pasbanc</p>
        <Divider />
        <List className={classes.root}>
            {/*nav items and their corresponding links*/}
            <ListItem>
           <Button 
            href='/'
            title='Dashboard'
            />
            </ListItem>
            <ListItem>
            <Button title='Transactions'
            href='/transactions'
            />
            </ListItem>
            <ListItem>
             <Button title='Subscriptions'
            href='/subscriptions'
            />
            </ListItem>
                    <Divider />
                    <ListItem>
                {/*signout button just below the list items*/}
        <Button 
        isButton={true}
        title='SignOut'
        onClick={signout}
        />
        </ListItem>
        </List>

      </Drawer>
      </div>
		</div>
		)
}
function mapStateToProps(state){
		return{
			isAuth:state.auth.isAuth,
		}

	}
export default compose(withStyles(styles),connect(mapStateToProps,actions))(Navbar)