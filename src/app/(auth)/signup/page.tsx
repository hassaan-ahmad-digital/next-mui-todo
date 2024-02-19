"use client"

import { useAppDispatch, useAppSelector } from "@/state"
import { authLoadingSelector, loginThunk } from "@/state/slices/AuthSlice"
import LoadingButton from "@mui/lab/LoadingButton"
import { Box, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

function Login() {
  const [loginParams, setLoginParams] = useState<LoginParams>({
    username: "",
    password: "",
  })

  const dispatch = useAppDispatch()

  const loading = useAppSelector(authLoadingSelector)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginThunk({ params: loginParams }))
  }

  const handleChange =
    (name: keyof LoginParams) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLoginParams(prev => ({ ...prev, [name]: e.target.value }))
    }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      onSubmit={handleLogin}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          fontWeight: "500",
        }}
      >
        Log In
      </Typography>
      <TextField
        id="username"
        label="Username"
        InputLabelProps={{
          shrink: true,
        }}
        value={loginParams.username}
        onChange={handleChange("username")}
        variant="standard"
      />
      <TextField
        id="login-passwords"
        label="Password"
        type="password"
        value={loginParams.password}
        onChange={handleChange("password")}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <LoadingButton
        loading={loading}
        type="submit"
        variant="contained"
        sx={{ alignSelf: "flex-end", textTransform: "none" }}
      >
        Log In
      </LoadingButton>
    </Box>
  )
}

export default Login
