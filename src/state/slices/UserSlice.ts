import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface UserState {
  loading: boolean
  userCreated: boolean
}

const initialState: UserState = {
  loading: false,
  userCreated: false,
}

export const createUser = createAsyncThunk<{ [key: string]: any }, { params: SignupParams }>(
  "user/add",
  async ({ params }, thunkAPI) => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/add`, {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: state => {
      state.loading = false
      state.userCreated = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false
        state.userCreated = true
      })
      .addCase(createUser.pending, state => {
        state.loading = true
      })
      .addCase(createUser.rejected, state => {
        state.loading = false
        state.userCreated = false
      })
  },
})

export const userCreatedSelector = (state: RootState) => state.user.userCreated
export const userLoadingStateSelector = (state: RootState) => state.user.loading

export const {
  reducer: userReducer,
  actions: userActions
} = userSlice