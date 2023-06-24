import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

/* API externa dbCocktails */
import HomePage from "./Pages/HomePage";
import ProductDetails from "./Pages/ProductDetails";
import NotFoundPage from "./Pages/NotFoundPage";
import About from "./Pages/About";
import Contant from "./Pages/Contact";
import Random from "./Pages/Random";
import Category from "./Pages/Category";

/* autentucacion - usuario */
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Forgot from "./Pages/Forgot";
import VerifyEmail from "./Pages/VerifyEmail";
import Profile from "./Pages/Profile";

/* bebidas de usuario */
import ListDrinks from "./Pages/ListDrinks";
import DetailsDrinks from "./Pages/DetailsDrinks";
import EditDrink from "./Pages/EditDrink";
import NewDrink from "./Pages/NewDrink";

function App() {

  return (
    <>
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/random" element={<Random />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contant />} />
        <Route path="/driks/:id" element={<ProductDetails />} />

        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify-email/:u/:c" element={<VerifyEmail />} />

        {/* Rutas privadas */}
        <Route path="/new-drink" element={<NewDrink />} />
        <Route path="/list-drinks" element={<ListDrinks />} />
        <Route path="/detail-drink/:id" element={<DetailsDrinks />} />
        <Route path="/edit-drink/:id" element={<EditDrink />} />
        <Route path="/profile" element={<Profile />} />


        {/* Ruta por defecto */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
