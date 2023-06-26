import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRandomCocktails = createAsyncThunk(
  "cocktails/fetchRandomCocktails",
  async () => {
    return fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    ).then((res) => res.json());
  }
);

export const fetchSingleCocktail = createAsyncThunk(
  "cocktails/fetchSignleCocktail",
  async ({ id }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then((res) => res.json());
  }
);

export const fetchCategoryCocktails = createAsyncThunk(
  "cocktails/fetchCategoryCocktails",
  async ({ category }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    ).then((res) => res.json());
  }
);

export const fetchSearchCocktails = createAsyncThunk(
  "cocktails/fetchSearchCocktails",
  async ({ url }) => {
    return fetch(url).then((res) => res.json());
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: {
    loading: false,
    cocktails: [],
    error: null,
    cocktail: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    //consulta por categoria
    [fetchCategoryCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategoryCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
    },
    [fetchCategoryCocktails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    //consulta aleatoria
    [fetchRandomCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRandomCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktail = action.payload.drinks;
    },
    [fetchRandomCocktails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    //consulta por keyword
    [fetchSearchCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSearchCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
    },
    [fetchSearchCocktails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    //consulta por id
    [fetchSingleCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSingleCocktail.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktail = action.payload.drinks;
    },
    [fetchSingleCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { clearError } = cocktailSlice.actions;
export default cocktailSlice.reducer;
