import React from 'react'

const Input =
	({ title, type,
		value, onChange,
		moreStyle, placeholder,
		labelStyle }) => {
		const style = `appearance-none focus:outline-none ${moreStyle}`;
		const label = `block text-gray-700 ${labelStyle}`
		return (
			<div className='mt-2'>
				<label className={label}>{title}</label>
				<input className={style}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
			</div>
		)

	}
export default Input