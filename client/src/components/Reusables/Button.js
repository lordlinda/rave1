import React from 'react'
import {Link} from 'react-router-dom'
const Button=({isButton,type,title,moreStyle,href,onClick})=>{
	const style=`focus:outline-none mt-4 ${moreStyle}`
	return(
		<div className=''>
		 {
		 	isButton ?
		 	<button
		 	className={style}
		 	type={type}
		 	onClick={onClick}
		 	>{title}</button>
		 	: 
		 	<Link to={href} className={style}>{title}</Link>
		 }
		</div>
		)

}
export default Button