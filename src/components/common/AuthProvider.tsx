"use client"

import { useAppSelector } from '@/state'
import { authorizedSelector } from '@/state/slices'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const authorized = useAppSelector(authorizedSelector)

  useEffect(() => {
    const isPublicPath = ["/signup", "/login"].includes(pathname)

    const isPrivatePath = ["/"].includes(pathname)

    if (isPrivatePath && !authorized) {
      router.push("/login")
    }

    if (isPublicPath && authorized) {
      router.push("/")
    }
  }, [authorized, pathname])
  
  return (
    <>{children}</>
  )
}
