import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
function RadioButtons({ value, onChange, options }) {
  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup value={value} onChange={onChange}>
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
              key={option.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioButtons;
