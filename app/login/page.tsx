"use client";
import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import LoginInput from "./compontes/loginInput";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, maxWidth: "90%" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          MAK Trading
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Sign in to your account
        </Typography>
        
        <LoginInput
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          submitted={submitted}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};

export default LoginPage;