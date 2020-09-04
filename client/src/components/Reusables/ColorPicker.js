import React,{useState} from 'react'
import {CirclePicker } from 'react-color';

class colorPicker extends React.Component{
	constructor(props){
		super(props)
     this.state ={
		color:'red'
	}
	this.handleChange=this.handleChange.bind(this)
	}
	
	handleChange=(color)=>{
         this.setState({color:color.hex})
	}
	render(){
		const {color}=this.state
		console.log(color)
	return (
	     <div>
	     <CirclePicker 
	     color={color}
	     onChangeComplete={this.handleChange}
	     />
	     <div style={{
	     	backgroundColor:`${color}`
	     }}>
	     {color}
	     </div>
	     </div>
		)
}
}
export default colorPicker