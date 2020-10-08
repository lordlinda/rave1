import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import BookSharpIcon from '@material-ui/icons/BookSharp';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    outline: 'none',
    position: 'fixed',
    bottom: '0px',
    marginTop: "50px"
  },
  button: {
    outline: 'none'
  }
});

const SimpleBottomNavigation = (props) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<Link to='/'><HomeSharpIcon /></Link>} className={classes.button} />
      <BottomNavigationAction label="Plans" icon={<Link to='/plans'><BookSharpIcon /></Link>} className={classes.button} />
      <BottomNavigationAction label="Transactions" icon={<Link to='/transactions'><ReceiptSharpIcon /></Link>} className={classes.button} />
    </BottomNavigation>
  );
}
export default SimpleBottomNavigation