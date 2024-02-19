import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface AuthState {
  authorized: boolean
  loading: boolean
  user: User | null
}

const initialState: AuthState = {
  authorized: false,
  loading: false,
  user: null,
}

export const loginThunk = createAsyncThunk<User, { params: LoginParams }>(
  "user/login",
  async ({ params }, thunkAPI) => {
    try {
      const data = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }).then(res => res.json())

      if (data.message === "Invalid credentials") {
        throw new Error(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const signupThunk = createAsyncThunk<User, { params: signupParams }>(
  "user/signup",
  async ({ params }, thunkAPI) => {
    try {
      const data = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }).then(res => res.json())

      if (data.message === "Invalid credentials") {
        throw new Error(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.authorized = true
        state.user = action.payload
        state.loading = false
      })
      .addCase(loginThunk.pending, (state, action) => {
        state.loading = true
      })
      .addCase(loginThunk.rejected, state => {
        state.loading = false
        state.authorized = false
        state.user = null
      })
      .addCase(signupThunk.fulfilled, (state, action) => {

      })
      .addCase(signupThunk.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signupThunk.rejected, (state, action) => {

      })
  },
})

export const userSelector = (state: RootState) => state.auth.user
export const authorizedSelector = (state: RootState) => state.auth.authorized
export const authLoadingSelector = (state: RootState) => state.auth.loading

export const {
  reducer,
  actions: {},
} = authSlice
