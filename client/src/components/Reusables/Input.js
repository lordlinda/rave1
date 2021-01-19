import React from "react";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  name,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};
export default Input;
