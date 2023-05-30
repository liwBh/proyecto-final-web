import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/logo-2.png";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";

const Header = () => {
  return (
    <div id="header">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand d-flex justify-content-center align-items-center"
            to="/"
          >
            <img
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="d-inline-block align-text-top mx-3 rounded-1"
            />
            <span className="typography-1">La Barra WEB</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-md-5">
              <li className="nav-item me-md-5">
                <Link
                  className="nav-link d-flex justify-content-center align-items-center"
                  aria-current="page"
                  to="/category"
                >
                  <TbCategory className="fs-5 me-1" /> 
                  <span>Category</span>
                </Link>
              </li>
              <li className="nav-item me-md-5">
                <Link
                  className="nav-link d-flex justify-content-center align-items-center"
                  aria-current="page"
                  to="/random"
                >
                  <GiPerspectiveDiceSixFacesRandom className="fs-5 me-1" /> 
                  <span>Cocktail</span>
                </Link>
              </li>
              <li className="nav-item me-md-5">
                <Link className="nav-link d-flex justify-content-center align-items-center" aria-current="page" to="/about">
                  <FaInfoCircle className="me-1" />
                  <span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex justify-content-center align-items-center" to="/contact">
                  <RiContactsBookFill className="me-1"/>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
