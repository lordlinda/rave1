import React from "react";
import "./Select.css";
const Select = ({ value, onChange, options }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
export default Select;
