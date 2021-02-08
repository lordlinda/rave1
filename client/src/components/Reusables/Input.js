import React from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";

const CustomInput = ({
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
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
        />
      </FormControl>
    </div>
  );
};
export default CustomInput;
