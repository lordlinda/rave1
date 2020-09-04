import React from 'react'

const Input=({title,type,value,onChange,moreStyle})=>{
	const style=`appearance-none focus:outline-none ${moreStyle}`
	return(
		<div className='mt-2'>
		<label className='block text-gray-700'>{title}</label>
		<input className={style}
		type={type}
		value={value}
		onChange={onChange}
		/>
		</div>
		)

}
export default Input