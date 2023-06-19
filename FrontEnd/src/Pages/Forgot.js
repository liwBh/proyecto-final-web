import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { regexEmail } from "../Assets/ExpresionRegular";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState({
    id: 0,
    status: false,
    message: "",
  });

  const errorAlert = (
    <div className="text-danger my-2">
      {error.message} <CgDanger className="text-danger" />
    </div>
  );

  const showErroAlert = (message, id) => {
    setError({
      id: id,
      status: true,
      message: message,
    });

    setTimeout(() => {
      setError({
        id: 0,
        status: false,
        message: "",
      });
    }, 1500);
  };

  const handleValidation = (e) => {
    if (email.trim() === "") {
      showErroAlert("The email is required", 1);
      return true;
    }

    if (!regexEmail.test(email)) {
      showErroAlert("The email is invalid", 1);
      return true;
    }

    return false;
  };

  const handleSubmmit = (e) => {
    e.preventDefault();

    //validacion de formulario
    if (handleValidation()) {
      return;
    }

    //realizar la peticion al servidor
    console.log(email);
  };

  return (
    <>
      <Layout>
        <div className="row mt-2 justify-content-center align-content-center">
          <div className="col-md-6 col-10">
            <form
              className="my-5 bg-light shadow-3 p-2 rounded-1 form-control"
              onSubmit={handleSubmmit}
            >
              <div className="bg-dark py-3 text-white rounded-3">
                <h3 className="text-center text-white">Forgot Password</h3>
              </div>

              {/* Email */}
              <div className="mb-1 mt-4 row p-2 justify-content-center align-content-center">
                <div className="input-container">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="input-field"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className={`input-label ${
                        email.trim() !== "" ? "input-label-used" : ""
                      }`}
                    >
                      Email
                    </label>
                    <span className="input-icon">
                      <FiMail />
                    </span>
                    <div className="input-line"></div>
                  </div>
                </div>
                {/* MENSAJE Validacion*/}
                {error.id === 1 && errorAlert}
              </div>

              {/* Button */}
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success w-50 mb-4">
                  Recover Password
                </button>
              </div>

              {/* Link */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Link to="/login" className="text-decoration-none">
                  <span className="text-muted">Return to</span> Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Forgot;
