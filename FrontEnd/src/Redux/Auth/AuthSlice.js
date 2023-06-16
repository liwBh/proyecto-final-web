import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  
  async ({ data }) => {
    const response = await fetch('https://www.', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
);

export const activateUser = createAsyncThunk(
  "auth/activateUser",
  
  async ({ data }) => {
    const response = await fetch('https://www.', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
);

export const recoveryPasswordUser = createAsyncThunk(
  "auth/recoveryPasswordUser",
  
  async ({ data }) => {
    const response = await fetch('https://www.', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
);

//actualizar usuario

//eliminar cuenta de usuario

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    urlActivation: "",
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {

  },
  extraReducers: {
    //login
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = action.error.message;
    },

    //activar cuenta de usuario
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.urlActivation = action.payload.urlActivation;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = action.error.message;
    },

    
    //recuperar contraseña de usuario
    [recoveryPasswordUser.pending]: (state, action) => {
      state.loading = true;
    },
    [recoveryPasswordUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Sent a message to your email to recover your password";
    },
    [recoveryPasswordUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = action.error.message;
    },

  }

  }
);

export default authSlice.reducer;