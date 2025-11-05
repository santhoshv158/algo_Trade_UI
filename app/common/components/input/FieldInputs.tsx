"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export interface InputTextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant" | "onChange"> {
  width?: number | string;
  variant?: "outlined" | "filled" | "standard";
  required?: boolean;
  onValueChange?: (value: string) => void;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
  label = "Enter text",
  width = 500,
  fullWidth = true,
  variant = "outlined",
  value = "",
  required = false,
  onValueChange,
  error,
  helperText,
  ...props
}) => {
  const [touched, setTouched] = useState(false);

  const showError = (required && touched && !value) || (!!error && touched);

  const displayHelperText =
    showError && !helperText ? `${label} is required` : helperText;

  return (
    <Box sx={{ width, maxWidth: "100%", mb: 2 }}>
      {/* ✅ Heading for label */}
      <Typography
        variant="subtitle2"
        sx={{
          mb: 0.5,
          fontWeight: 600,
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: 0.3,
        }}
      >
        {label}
        {required && <Typography component="span" color="error">*</Typography>}
      </Typography>

      <TextField
        {...props}
        fullWidth={fullWidth}
        variant={variant}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        onBlur={() => setTouched(true)}
        error={showError}
        helperText={showError ? displayHelperText : ""}
      />
    </Box>
  );
};

export default InputTextField;
