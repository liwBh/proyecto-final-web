import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "users/createUser",

  async ({ data }) => {
    const response = await fetch(
      "https://localhost:44328/api/Usuario/ingresarUsuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          elUsuario: {
            nombre: data.name,
            apellidos: data.lastName,
            correoElectronico: data.email,
            password: data.password,
          },
        }),
      }
    );

    return response.json();
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",

  async ({ data }) => {
    const response = await fetch(
      "https://localhost:44328/api/Usuario/ActualizarUsuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          elUsuario: {
            id: data.id,
            nombre: data.name,
            apellidos: data.lastName,
            correoElectronico: data.email,
            password: data.password,
          },
        }),
      }
    );

    return response.json();
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",

  async ({ id }) => {
    const response = await fetch(
      "https://localhost:44328/api/Usuario/EliminarUsuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          elUsuario: {
            id: id,
          },
        }),
      }
    );

    return response.json();
  }
);

export const clearState = createAsyncThunk("auth/clearState", () => {
  return {
    message: "",
    loading: false,
    errorRedux: null,
  };
});

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
      if (action.payload.result) {
        //si no hay errores
        state.message = "Sing Up Succesfully";
      } else {
        let error = "";
        if (
          action.payload.errors[0] === "ERROR DESDE BD: CORREO YA REGISTRADO"
        ) {
          error = "The mail has already been registered";
        } else {
          error = "Failed to register account";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to register account";
    },

    //consulta para actualizar usuario
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Account updated successfully";
      } else {
        let error = "";
        if (action.payload.errors > 0) {
          error = "Failed to update account";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to update account";
    },

    //consulta para eliminar usuario
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Account deleted successfully";
      } else {
        let error = "";
        if (action.payload.errors > 0) {
          error = "Failed to delete account";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to delete account";
    },

    //resetear state
    [clearState.fulfilled]: (state, action) => {
      state.loading = action.payload.loading;
      state.errorRedux = action.payload.errorRedux;
      state.message = action.payload.message;
    },
  },
});

export default usersSlice.reducer;
