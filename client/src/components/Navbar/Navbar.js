import React, { useState } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Button from '../Reusables/Button.js'
import * as actions from '../../redux/actions/index.js'



const Navbar = (props) => {
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }

  const signout = () => {
    props.signOut()
  }

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return 'link__active';
    } else {
      return '';
    }
  }
  //console.log(props)
  return (
    <div className='block md:hidden text-gray-900 w-5'>
      {/*this is the navbar that shows on small screens instaed of the sidebar*/}
      <div onClick={handleToggle} className='pointer'>
        <MenuIcon /></div>
      <div className='text-xl px-4 mt-10 ml-3 menu__sidebar'>
        <Drawer
          anchor="left"
          open={open}
          onClose={handleToggle}

        >
          {/*this allows the title to be bigger on small screens and the margin left ligns it up with
         the list items and margin-top gives us some distance from the top of the screen*/}


          <List className='menu__list'>
            {/*nav items and their corresponding links*/}
            <ListItem>
              {/*signout button just below the list items*/}
              <Button
                href='/'
                title='Dashboard'
                moreStyle={`text-lg hover:text-customPurple hover:bg-purple-300 px-3 py-2 rounded-full ${isActive(props.history, '/')}`}
              />
            </ListItem>
            <ListItem>
              {/*signout button just below the list items*/}
              <Button
                href='/plans'
                title='Plans'
                moreStyle={`text-lg hover:text-customPurple hover:bg-purple-300 px-3 py-2 rounded-full ${isActive(props.history, '/plans')}`}
              />
            </ListItem>
            <ListItem>
              {/*signout button just below the list items*/}
              <Button
                href='/transactions'
                title='Transactions'
                moreStyle={`text-lg hover:text-customPurple hover:bg-purple-300 px-3 py-3 rounded-full ${isActive(props.history, '/transactions')}`}
              />
            </ListItem>
            <ListItem>
              {/*signout button just below the list items*/}
              <Button
                isButton={true}
                title='SignOut'
                onClick={signout}
                moreStyle='px-3'
              />
            </ListItem>
          </List>

        </Drawer>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
  }

}
export default compose(withRouter, connect(mapStateToProps, actions))(Navbar)