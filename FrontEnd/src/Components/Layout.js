import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header/>
      <div className="container flex-grow-1">
        <div className="content">{children}</div>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
