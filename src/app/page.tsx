import * as React from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import NextLink from "next/link"
import { Copyright, ProTip } from "@/components"

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >TODO</Box>
    </Container>
  )
}
