import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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