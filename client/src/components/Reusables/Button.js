import React from 'react'
import {Link} from 'react-router-dom'
const Button=({isButton,type,title,moreStyle,href,onClick})=>{
	/*the padding of 6 is what gives that sapcing on the nav items so be carefull
	if u choose to remove it*/
	const style=`focus:outline-none mt-4 px-6 ${moreStyle}`
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