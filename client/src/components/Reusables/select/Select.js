import React from 'react'

const Select=({value,onChange,type,moreStyle,options})=>{
  const style = `py-1 mt-2 ml-2 rounded-md outline-none ${moreStyle}`
 return (
 	<div>
 <select 
 onChange={onChange}
 value={value}
 className={style}>
 {
 	options.map(option=>{
 		/*whenever we map we have to provide a unique key*/
 		return <option value={option} key={option}>{option}</option>
 	})
 }
</select>
 	</div>
 	)
}
export default Select