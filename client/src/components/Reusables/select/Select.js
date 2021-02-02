import React from "react";
import "./Select.css";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const SelectInput = ({ value, onChange, options, label }) => {
  return (
    <div>
      <FormControl>
        <Select value={value} onChange={onChange} displayEmpty>
          <MenuItem value="" disabled>
            {label}
          </MenuItem>
          {options.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectInput;
