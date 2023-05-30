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
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>

  );
}

export default App;
