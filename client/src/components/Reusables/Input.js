import React from 'react'

const Input=({title,type,value,onChange,moreStyle,placeholder,onfocus,onblur})=>{
	const style=`appearance-none focus:outline-none ${moreStyle}`
	return(
		<div className='mt-2'>
		<label className='block text-gray-700'>{title}</label>
		<input className={style}
		type={type}
		value={value}
		onChange={onChange}
		onFocus={onfocus}
		onBlur={onblur}
		placeholder={placeholder}
		/>
		</div>
		)

}
export default Input