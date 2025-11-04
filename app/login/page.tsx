"use client";
import React, { useState } from "react";
import InputTextField from "../common/components/input/FieldInputs";
import { Button, Box } from "@mui/material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ width: 400, mx: "auto", mt: 4 }}>
      <InputTextField
        label="Email"
        required
        value={email}
        onValueChange={setEmail}
        placeholder="Enter your email"
      />

      <InputTextField
        label="Password"
        required
        type="password"
        value={password}
        onValueChange={setPassword}
        placeholder="Enter your password"
        sx={{ mt: 2 }}
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
    </Box>
  );
};

export default LoginPage;
