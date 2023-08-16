import React from "react";
import { Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";

export default function InputCheckbox(props) {
  const { name, control, label, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl error={!!error} {...rest}>
          <FormControlLabel
            label={label}
            checked={value}
            inputRef={ref}
            control={<Checkbox onChange={onChange} />}
            data-testid={`checkbox-${name}`}
          />
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
InputCheckbox.propTypes = {
  label: PropTypes.string,
};
