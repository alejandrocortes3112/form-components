import React from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function InputNumber(props) {
  const { name, control, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <NumericFormat
          value={value}
          inputRef={ref}
          onValueChange={(values) => onChange(values.floatValue)}
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

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

InputNumber.defaultProps = {
  label: "",
};
