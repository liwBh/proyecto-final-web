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

    //resetear state
    [clearState.fulfilled]: (state, action) => {
      state.loading = action.payload.loading;
      state.errorRedux = action.payload.errorRedux;
      state.message = action.payload.message;
    },
  },
});

export default usersSlice.reducer;
