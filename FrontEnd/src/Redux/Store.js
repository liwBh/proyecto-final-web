import { configureStore } from "@reduxjs/toolkit";
import cocktailSlice from "./Features/CocktailSlice";
import usersSlice from "./Users/UsersSlice";
import authSlice from "./Auth/AuthSlice";
//import CocktailsSlice from "./Cocktails/CocktailsSlice";

export default configureStore({ 
  reducer: {
    app: cocktailSlice,
    users: usersSlice,
    auth: authSlice,
    //cocktails: CocktailsSlice,
  }
 });