import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Link} from 'react-router-dom'
const BackArrow =({href,moreStyle})=>{
	const style =`${moreStyle}`
	return (
		/*some distance from the top*/
		<div className={style}>
		<Link to={href}>
		<ArrowBackIcon />
		</Link>
		</div>
		)
} 

export default BackArrow