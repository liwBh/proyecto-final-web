import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* funcion para convertir array a string */
const convertirArrayAString = (array) => {
  let string = "";

  array.forEach((element) => {
    string += element + "-";
  });

  return string;
};

/* funcion para convertir string a array */
const convertirStringAArray = (string) => {
  const array = string.split("-");

  return array;
};

export const createDrink = createAsyncThunk(
  "drinks/createDrink",

  async ({ data }) => {
    const response = await fetch(
      "https://localhost:44328/api/Bebida/ingresarBebida",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laBebida: {
            ingredientes: convertirArrayAString(data.ingredients),
            medidas: convertirArrayAString(data.measures),
            correoElectronico: data.email,
            password: data.password,
          },
        }),
      }
    );

    return response.json();
  }
);

export const setLikeDrink = createAsyncThunk(
  "drinks/setLikeDrink",

  async ({ data }) => {
    const response = await fetch(
      "https://localhost:44328/api/favorito/ingresarFavorito",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laBebida: {
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

export const getDrinks = createAsyncThunk("drinks/getDrinks", async () => {
  const res = await fetch("https://localhost:44328/api/Bebida/obtenerBebidas");
  const data = await res.json();

  const drinks = data.map((drink) => {
    drink.ingredientes = convertirStringAArray(drink.ingredientes);
    drink.medidas = convertirStringAArray(drink.medidas);

    return drink;
  });

  return drinks;
});

export const updateDrink = createAsyncThunk(
  "drinks/updateDrink",

  async ({ data }) => {
    const response = await fetch(
      "https://localhost:44328/api/Bebida/actualizarBebida",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laBebida: {
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

export const deleteDrink = createAsyncThunk(
  "drinks/deleteDrink",

  async ({ data }) => {
    const response = await fetch(
      "https://localhost:44328/api/Bebida/eliminarBebida",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laBebida: {
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

export const clearState = createAsyncThunk("drinks/clearState", () => {
  return {
    message: "",
    loading: false,
    errorRedux: null,
  };
});

const drinkSlice = createSlice({
  name: "drinks",
  initialState: {
    drink: null,
    drinks: [],
    loading: false,
    errorRedux: null,
  },
  reducers: {},
  extraReducers: {
    //obtener bebidas
    [getDrinks.pending]: (state, action) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    },
    [getDrinks.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.drinks = action.payload.bebidas;
      }

      if (action.payload.errors > 0 || !action.payload.result) {
        //si hay errores
        state.errorRedux = "Failure to get the drinks";
      }

      state.loading = false;
    },
    [getDrinks.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failure to get the drinks";
    },

    //consulta para registrar bebida
    [createDrink.pending]: (state, action) => {
      state.loading = true;
    },
    [createDrink.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Drink successfully registered";
      } else {
        let error = "";
        if (action.payload.errors[0] > 0 || !action.payload.result) {
          error = "Failed to register drink";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [createDrink.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to register drink";
    },

    //consulta para dar like a bebida
    [setLikeDrink.pending]: (state, action) => {
      state.loading = true;
    },
    [setLikeDrink.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Added likes to the drink";
      } else {
        let error = "";
        if (action.payload.errors[0] > 0 || !action.payload.result) {
          error = "Failed to like drink";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [setLikeDrink.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to like drink";
    },

    //consulta para eliminar bebida
    [deleteDrink.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteDrink.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Drink successfully deleted";
      } else {
        let error = "";
        if (action.payload.errors > 0 || !action.payload.result) {
          error = "Failed to delete drink";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [deleteDrink.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to delete drink";
    },
    //consulta para actualizar bebida
    [updateDrink.pending]: (state, action) => {
      state.loading = true;
    },
    [updateDrink.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //si no hay errores
        state.message = "Drink successfully updated";
      } else {
        let error = "";
        if (action.payload.errors > 0 || !action.payload.result) {
          error = "Failed to update drink";
        }
        state.errorRedux = error;
      }

      state.loading = false;
    },
    [updateDrink.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to update drink";
    },

    //resetear state
    [clearState.fulfilled]: (state, action) => {
      state.loading = action.payload.loading;
      state.errorRedux = action.payload.errorRedux;
      state.message = action.payload.message;
    },
  },
});

export default drinkSlice.reducer;
