import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import BookSharpIcon from '@material-ui/icons/BookSharp';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';
import { Link, withRouter } from 'react-router-dom'


const SimpleBottomNavigation = (props) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return 'link__active';
    } else {
      return '';
    }
  }
  return (
    <div className='bottomNavigation'>
      <Link to='/' className={`bottomMenuLink ${isActive(props.history, '/')}`}><HomeSharpIcon /> <span className='block text-xs'>Home</span></Link>
      <Link to='/plans' className={`bottomMenuLink ${isActive(props.history, '/plans')}`}><BookSharpIcon /> <span className='block text-xs'>Plans</span></Link>
      <Link to='/transactions' className={`bottomMenuLink ${isActive(props.history, '/transactions')}`}><ReceiptSharpIcon /> <span className='block text-xs'>Transactions</span></Link>
    </div>
  );
}
export default withRouter(SimpleBottomNavigation)