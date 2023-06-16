import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "users/createUser",

  async ({ data }) => {
    const response = await fetch("https://www.", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    token: "",
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {},
  extraReducers: {
    //consulta para registrar usuario
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Sing Up Succesfully";
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = action.error.message;
    },
  },
});

export default usersSlice.reducer;
