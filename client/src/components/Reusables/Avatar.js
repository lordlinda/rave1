import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepPurple } from '@material-ui/core/colors';
import {connect} from 'react-redux'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function LetterAvatar(props) {
  const [letter,setLetter]=useState('')
  useEffect(()=>{
    //for the avatar we display the first letter of the username,
    //so we first convert it to uppercase split the name into an array of strings
    //and pick the first character
  setLetter(props.name.toUpperCase().split('')[0])
  },[props.name.length])
  const classes = useStyles()
  return (
    <div className='hidden md:block'>
      <Avatar className={classes.purple} >{letter}</Avatar>
      </div>
  );
}
const mapStateToProps=(state)=>{
  return {
    name:state.data.name
  }

}
export default connect(mapStateToProps)(LetterAvatar)