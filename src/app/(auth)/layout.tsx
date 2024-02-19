import { Container } from "@mui/material"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          boxShadow: "0 1rem 10rem rgba(0, 0, 0, 0.202)",
          padding: "1rem",
          borderRadius: "0.4rem",
          border: '1px solid #e0e0e0',
          background: 'white',
        }}
      >
        {children}
      </Container>
    </Container>
  )
}
