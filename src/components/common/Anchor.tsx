import { Link, LinkProps } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'

type Props = {
  route: string,
  children: React.ReactNode
} & Omit<LinkProps, "href" | "component">

export function Anchor({children, route, ...rest}: Props) {
  return (
    <Link href={route} component={NextLink} {...rest}>
      {children}
    </Link>
  )
}
