import React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export default function InputRadio(props) {
  const { name, control, options, label, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl error={!!error} {...rest}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            value={value}
            onChange={(ev) => {
              onChange(ev.target.value);
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                inputRef={ref}
                key={option.value}
                control={<Radio />}
                label={option.label}
                value={option.value}
              />
            ))}
          </RadioGroup>
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

InputRadio.propTypes = {
  options: PropTypes.instanceOf(Array),
  label: PropTypes.string,
};
