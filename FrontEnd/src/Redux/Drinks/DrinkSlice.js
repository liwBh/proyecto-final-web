import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
            ...data,
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
    console.log(data);
    const response = await fetch(
      "https://localhost:44328/api/Bebida/vincularFavorito",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: data.idUser,
          idBebida: data.idDrink,
          session: data.token,
        }),
      }
    );

    return response.json();
  }
);

export const getDrinks = createAsyncThunk("drinks/getDrinks", async () => {
  const res = await fetch("https://localhost:44328/api/Bebida/");
  const data = await res.json();

  return data;
});

export const updateDrink = createAsyncThunk(
  "drinks/updateDrink",

  async ({ data }) => {
    console.log(data);
    const response = await fetch(
      "https://localhost:44328/api/Bebida/actualizarBebida",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laBebida: {
            ...data,
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
    console.log(data)
    const response = await fetch(
      "https://localhost:44328/api/Bebida/eliminarBebida",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laBebida: {
            id: data,
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

export const setCurrentDrink = createAsyncThunk(
  "drinks/setCurrentDrink",
  ({ data }) => {
    console.log(data);
    //almacenar en localstorage
    localStorage.setItem("drink", JSON.stringify(data));

    return {
      drink: data,
    };
  }
);

export const getCurrentDrink = createAsyncThunk(
  "drinks/getCurrentDrink",
  () => {
    //recuperar del localstorage
    const drinkLocalStorage = localStorage.getItem("drink");
    const drinkCurrent = JSON.parse(drinkLocalStorage);

    return {
      drink: drinkCurrent,
    };
  }
);

const drinkSlice = createSlice({
  name: "drinks",
  initialState: {
    drinkCurrent: null,
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
        state.drinks = action.payload.ListaDeBebidas;
      } else if (action.payload.errors.length > 0 || !action.payload.result) {
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
      } else if (action.payload.errors.length > 0 || !action.payload.result) {
        state.errorRedux = "Failed to register drink";
      }

      state.loading = false;
    },
    [createDrink.rejected]: (state, action) => {
      state.loading = false;
      state.errorRedux = "Failed to register drink";
    },

    //consulta para dar like a bebida
    [setLikeDrink.pending]: (state, action) => {
      state.loading = false;
    },
    [setLikeDrink.fulfilled]: (state, action) => {
      if (action.payload.result) {
        //no tiene un like activo, se agrega
        state.message = "Added likes to the drink";
      } else if (!action.payload.result && action.payload.errors.length === 0) {
        //tiene un like activo, se elimina
        state.message = "removed likes to the drink";
      } else {
        //ocurrio un error
        state.errorRedux = "Failed to like drink";
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
      console.log(action.payload)
      if (action.payload.result) {
        //si no hay errores
        state.message = "Drink successfully deleted";
      } else if (action.payload.errors.length > 0 || !action.payload.result) {
        state.errorRedux = "Failed to delete drink";
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
      } else if (action.payload.errors.length > 0 || !action.payload.result) {
        state.errorRedux = "Failed to update drink";
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

    //bebida actual, detailsDrink
    [setCurrentDrink.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.drinkCurrent = action.payload.drink;
      state.loading = false;
    },
    [getCurrentDrink.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.drinkCurrent = action.payload.drink;
      state.loading = false;
    },
  },
});

export default drinkSlice.reducer;
