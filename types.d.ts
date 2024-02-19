type LoginParams = {
  username: string
  password: string
}

type User = {
  email: string
  firstName: string
  gender: "male" | "female"
  id: number
  image: string
  lastName: string
  token: string
  username: string
}

type signupParams = {
  firstName: string,
  lastName: string,
  username: string,
  password: string
}