import React from 'react'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import {Link} from 'react-router-dom'
const PlusButton =({href,moreStyle})=>{
	const style =`${moreStyle}`
	return (
		/*some distance from the top*/
		<div className={style}>
		<Link to={href}>
		<AddOutlinedIcon />
		</Link>
		</div>
		)
} 

export default PlusButton