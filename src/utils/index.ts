export const getUser = (): User | null => {
  if (typeof window === "object") {
    const user: string | null = window.localStorage?.getItem("user")
    if (!!user) {
      return JSON.parse(user) as User
    }
    return null
  }
  return null
}

