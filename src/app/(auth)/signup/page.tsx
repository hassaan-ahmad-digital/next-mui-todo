"use client"

import { Anchor } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/state"
import { authLoadingSelector, createUser } from "@/state/slices"
import LoadingButton from "@mui/lab/LoadingButton"
import { Box, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

function Login() {
  const [signupParams, setSignupParams] = useState<SignupParams>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const dispatch = useAppDispatch()

  const loading = useAppSelector(authLoadingSelector)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createUser({ params: signupParams }))
  }

  const handleChange =
    (name: keyof SignupParams) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSignupParams(prev => ({ ...prev, [name]: e.target.value }))
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
        Sign Up
      </Typography>
      <TextField
        id="firstName"
        label="First Name"
        InputLabelProps={{
          shrink: true,
        }}
        value={signupParams.firstName}
        onChange={handleChange("firstName")}
        variant="standard"
      />
      <TextField
        id="lastName"
        label="Last Name"
        InputLabelProps={{
          shrink: true,
        }}
        value={signupParams.lastName}
        onChange={handleChange("lastName")}
        variant="standard"
      />
      <TextField
        id="username"
        label="Username"
        InputLabelProps={{
          shrink: true,
        }}
        value={signupParams.username}
        onChange={handleChange("username")}
        variant="standard"
      />
      <TextField
        id="login-passwords"
        label="Password"
        type="password"
        value={signupParams.password}
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
        Register
      </LoadingButton>
      <Typography variant="overline" textAlign="center">
        Already Registered?{" "}
        <Anchor sx={{ fontWeight: 600 }} route="/login">
          Log In
        </Anchor>
      </Typography>
    </Box>
  )
}

export default Login
