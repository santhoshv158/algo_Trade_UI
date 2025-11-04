"use client";
import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import LoginInput from "./compontes/loginInput";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ width: 400, mx: "auto", mt: 4 }}>
      <LoginInput
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        submitted={submitted}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default LoginPage;
