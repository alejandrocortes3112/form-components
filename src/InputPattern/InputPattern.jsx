import React from "react";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function InputPattern(props) {
  const { name, control, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <PatternFormat
          value={value}
          inputRef={ref}
          onChange={onChange}
          customInput={TextField}
          error={!!error}
          helperText={error ? error.message : ""}
          inputProps={{ "data-testid": `input-${name}` }}
          {...rest}
        />
      )}
    />
  );
}

InputPattern.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

InputPattern.defaultProps = {
  label: "",
};
