import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export default function InputSelect(props) {
  const { name, control, options, label, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl error={!!error} {...rest}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={onChange}
            inputRef={ref}
            data-testid={`input-${name}`}
          >
            {options.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.instanceOf(Array),
};

InputSelect.defaultProps = {
  label: "",
};
