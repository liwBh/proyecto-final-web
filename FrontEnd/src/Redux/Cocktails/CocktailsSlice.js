import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "users/createUser",

  async ({ data }) => {
    const response = await fetch("https://localhost:44328/api/Usuario/ingresarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          elUsuario: {
            nombre: data.name,
            apellidos: data.lastName,
            correoElectronico: data.email,
            password: data.password,
          }
        
        }
      ),
    });

    return  response.json();
  }
);

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: {
    cocktail:{},
    cocktails: [],
    loading: false,
    errorRedux: null,
  },
  reducers: {

  },
  extraReducers: {
    
  }

  }
);

export default cocktailsSlice.reducer;