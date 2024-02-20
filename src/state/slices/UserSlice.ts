import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface UserState {
  loading: boolean
  newlyCreatedUser: { [key: string]: any } | null
}

const initialState: UserState = {
  loading: false,
  newlyCreatedUser: null,
}

export const createUser = createAsyncThunk< {[key: string]: any}, { params: SignupParams }>(
  "user/add",
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.loading = false
      state.newlyCreatedUser = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.newlyCreatedUser = action.payload
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false
        state.newlyCreatedUser = null
      })
  },
})

export const newlyCreatedUserSelector = (state: RootState) => state.user.newlyCreatedUser
export const userLoadingStateSelector = (state: RootState) => state.user.loading
