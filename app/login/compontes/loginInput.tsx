"use client";
import React from "react";
import InputTextField from "@/app/common/components/input/FieldInputs";
import { Button } from "@mui/material";

interface LoginInputProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  submitted?: boolean;
  handleSubmit: () => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  submitted = false,
  handleSubmit,
}) => {
  return (
    <>
      <InputTextField
        label="Email"
        required
        value={email}
        onValueChange={setEmail}
        placeholder="Enter your email"
        error={submitted && !email}
        helperText={submitted && !email ? "Email is required" : ""}
      />

      <InputTextField
        label="Password"
        required
        type="password"
        value={password}
        onValueChange={setPassword}
        placeholder="Enter your password"
        sx={{ mt: 2 }}
        error={submitted && !password}
        helperText={submitted && !password ? "Password is required" : ""}
      />
       <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Login

      </Button>
    </>
  );
};

export default LoginInput;
