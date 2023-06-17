import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",

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

export const activateUser = createAsyncThunk(
  "auth/activateUser",

  async ({ data }) => {

    console.log(data);
    const response = await fetch(
      "https://localhost:44328/api/Usuario/activarUsuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correoElectronico: data.email,
          numeroDeActivacion: data.activationNumber,
        }),
      }
    );

    return response.json();
  }
);

//http://localhost:3000/verify-email/a/b
//https://localhost:3000/verify-email/liwbarqueroh@gmail.com/5sGLFBnziCIulWhVZt4MkA

export const recoveryPasswordUser = createAsyncThunk(
  "auth/recoveryPasswordUser",

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

//actualizar usuario

//eliminar cuenta de usuario

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {},
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
    [activateUser.pending]: (state, action) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    },
    [activateUser.fulfilled]: (state, action) => {

      console.log(action.payload)
      
      if (action.payload.result) {
        //si no hay errores
        state.message = "Account activated successfully";
      }

      if (action.payload.errors > 0 || !action.payload.result) {//si hay errores
        state.errorRedux = "Account activation failed";
      }

      state.loading = false;
    },
    [activateUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Account activation failed";
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
  },
});

export default authSlice.reducer;
