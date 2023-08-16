import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export default function InputText(props) {
  const { name, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          onChange={onChange}
          value={value}
          inputProps={{ "data-testid": `input-${name}` }}
          inputRef={ref}
          helperText={error ? error.message : ""}
          {...rest}
        />
      )}
    />
  );
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

InputText.defaultProps = {
  label: "",
};
