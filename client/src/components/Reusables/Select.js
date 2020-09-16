import React from 'react'

const Select=({value,onChange,type,moreStyle})=>{
  const style = `py-1 mt-2 ml-2 rounded-md bg-white border-2 ${moreStyle}`
 return (
 	<div>
 	
      <select 
 onChange={onChange}
 value={value}
 className={style}>
 <option value=''>Currency</option>
  <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="UGX">UGX</option>
  <option value="GBP">GBP</option>
  <option value="KES">KES</option>
  <option value="GHS">GHS</option>
  <option value="RWF">RWF</option>
  <option value="SLL">SLL</option>
  <option value="ZMW">ZMW</option>
  <option value="ZAR">ZAR</option>
 <option value="TZS">TZS</option>
 <option value="AUD">AUD</option>
<option value="XOF">XOF</option>
 <option value="XAF">XAF</option>
<option value="CAD">CAD</option>
</select>
      
 	
 	
 	</div>
 	)
}
export default Select