import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async ({ data }) => {
    const response = await fetch("https://localhost:44328/api/Usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        elUsuario: {
          correoElectronico: data.email,
          password: data.password,
        },
      }),
    });

    return response.json();
  }
);

export const loginOutUser = createAsyncThunk("auth/loginOutUser", () => {
  //eliminar datos del localsotrage
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  return {
    user: null,
    message: "Closing the session",
    loading: false,
    errorRedux: null,
    token: null,
  };
});

export const clearState = createAsyncThunk("auth/clearState", () => {
  return {
    message: "",
    loading: false,
    errorRedux: null,
  };
});

export const getLocalStorage = createAsyncThunk("auth/getLocalStorage", () => {
  // Obtener la cadena de texto del Local Storage
  const objetoString = localStorage.getItem("user");
  const tokenString = localStorage.getItem("token");

  // Convertir la cadena de texto a un objeto utilizando JSON.parse
  const objetoRecuperado = JSON.parse(objetoString);

  return {
    user: objetoRecuperado,
    token: tokenString,
  };
});

export const upateDataUser = createAsyncThunk(
  "auth/upateDataUser",
  ({ data }) => {
    const user = {
      id: data.id,
      nombre: data.name,
      apellidos: data.lastName,
      correoElectronico: data.email,
      password: "",
      confirmarPassword: "",
    };

    // Convertir el objeto a una cadena de texto utilizando JSON.stringify
    const objetoString = JSON.stringify(user);
    // Almacenar el objeto en el Local Storage
    localStorage.setItem("user", objetoString);

    return user;
  }
);

export const activateUser = createAsyncThunk(
  "auth/activateUser",

  async ({ data }) => {
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    message: "",
    loading: false,
    errorRedux: null,
    token: null,
  },
  reducers: {},
  extraReducers: {
    //login
    [loginUser.pending]: (state, action) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores

        // Convertir el objeto a una cadena de texto utilizando JSON.stringify
        const objetoString = JSON.stringify(action.payload.elUsuario);
        // Almacenar el objeto en el Local Storage
        localStorage.setItem("user", objetoString);
        localStorage.setItem("token", action.payload.session);

        //manejo del state
        state.message = "Logging in";
        state.user = action.payload.elUsuario;
        state.token = action.payload.session;
      }

      if (action.payload.errors.length > 0 || !action.payload.result) {
        //si hay errores
        state.errorRedux = "Failed to login";
      }

      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to login";
    },

    //cerrar sesion
    [loginOutUser.fulfilled]: (state, action) => {
      state.loading = action.payload.loading;
      state.errorRedux = action.payload.errorRedux;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    //resetear state
    [clearState.fulfilled]: (state, action) => {
      state.loading = action.payload.loading;
      state.errorRedux = action.payload.errorRedux;
      state.message = action.payload.message;
    },

    //perseverancia de los datos del usuario
    [getLocalStorage.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    //actualizar los datos de sesion usuario
    [upateDataUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },

    //activar cuenta de usuario
    [activateUser.pending]: (state, action) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    },
    [activateUser.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Account activated successfully";
      }

      if (action.payload.errors.length > 0 || !action.payload.result) {
        //si hay errores
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

      if (action.payload.result) {
        state.message = "Sent a message to your email to recover your password";
      }
      if (action.payload.errors.length > 0 || !action.payload.result) {
        //si hay errores
        state.errorRedux = "Account activation failed";
      }
    },
    [recoveryPasswordUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = action.error.message;
    },
  },
});

export default authSlice.reducer;
