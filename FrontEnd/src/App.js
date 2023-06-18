import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetails from "./Pages/ProductDetails";
import NotFoundPage from "./Pages/NotFoundPage";
import About from "./Pages/About";
import Contant from "./Pages/Contact";
import Random from "./Pages/Random";
import Category from "./Pages/Category";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Forgot from "./Pages/Forgot";
import Cocktails from "./Pages/Coktails";
import Cocktail from "./Pages/Coktail";
import VerifyEmail from "./Pages/VerifyEmail";
import Profile from "./Pages/Profile";

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
        <Route path="/cocktail" element={<Cocktail />} />
        <Route path="/list-cocktails" element={<Cocktails />} />
        <Route path="/profile" element={<Profile />} />

        {/* Ruta por defecto */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
