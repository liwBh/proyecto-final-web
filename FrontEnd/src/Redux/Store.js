import { configureStore } from "@reduxjs/toolkit";
import cocktailSlice from "./Features/CocktailSlice";

export default configureStore({ 
  reducer: {
    app: cocktailSlice,
    auth: cocktailSlice,
    users: cocktailSlice,
    cocktails: cocktailSlice,
    
  }
 });