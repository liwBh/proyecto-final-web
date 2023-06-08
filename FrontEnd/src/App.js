import React from "react";
import "./App.css";
import {Routes, Route} from "react-router-dom";
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
import Coktails from "./Pages/Coktails";
import Cocktail from "./Pages/Coktail";
import VerifyEmail from "./Pages/VerifyEmail";
import Profile from "./Pages/Profile";



function App() {                   
  return (
    
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random" element={<Random />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contant />} />
        <Route path="/driks/:id" element={<ProductDetails />} />
        {/* users page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/list-cocktails" element={<Coktails/>} />
        <Route path="/cocktail" element={<Cocktail/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/profile" element={<Profile/>} />


        {/* protected route */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>

  );
}

export default App;
