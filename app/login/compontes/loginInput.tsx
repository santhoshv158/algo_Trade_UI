"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputTextField from "@/app/common/components/input/FieldInputs";
import { Button, Alert } from "@mui/material";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tygunccerror, setError] = useState("");

  const onSubmit = async () => {
    handleSubmit(); 

    if (!email || !password) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:9000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        router.push("/portal/dashboard");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )} */}

      <InputTextField
        label="Email"
        required
        value={email}
        onValueChange={setEmail}
        placeholder="Enter your email"
        error={submitted && !email}
        helperText={submitted && !email ? "Email is required" : ""}
        disabled={loading}
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
        disabled={loading}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </>
  );
};

export default LoginInput;