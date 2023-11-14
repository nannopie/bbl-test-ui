"use client"

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";

const intitialLoginData = {
  username: "",
  password: ""
}

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState(intitialLoginData);
  function handleChange(e: any) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const login = () => {
    localStorage.setItem('bblTestLogin', 'true');
    localStorage.setItem('bblTestLoginUsername', loginData.username);
    router.push('/users');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box  >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={loginData.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <Typography variant="body1" sx={{ color: "#B2BEB5" }}>
            ** it&apos;s fake login you can input whatever
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }} onClick={login}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}