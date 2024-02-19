import { Link, LinkProps } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'

type Props = {
  route: string,
  content: string,
} & Omit<LinkProps, "href" | "component">

export function Anchor({route, content, ...rest}: Props) {
  return (
    <Link href={route} component={NextLink} {...rest}>
      {content}
    </Link>
  )
}
