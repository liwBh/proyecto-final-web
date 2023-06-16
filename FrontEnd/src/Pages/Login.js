import React, { useState } from "react";
import Layout from "../Components/Layout";
import { BiLock } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { regexEmail } from "../Assets/ExpresionRegular";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    id: 0,
    status: false,
    message: "",
  });

  const { email, password } = formData;

  const handleValidation = (e) => {

    if (email.trim() === "") {
      showErroAlert("The email is required", 1);
      return true;
    }

    if (!regexEmail.test(email)) {
      showErroAlert("The email is invalid", 1);
      return true;
    }

    if (password.trim() === "") {
      showErroAlert("The password is required", 2);
      return true;
    }

    if (password.trim().length < 8 || password.trim().length > 16) {
      showErroAlert(
        "The password must be a minimum of 8 and a maximum of 16 characters",
        2
      );
      return true;
    }

    return false;
  };

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

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmmit = (e) => {
    e.preventDefault();

    //validacion de formulario
    if (handleValidation()) {
      return;
    }

    //enviar datos al servidor
    console.log(formData);
  };

  const errorAlert = (
    <div className="text-danger my-2">
      {error.message} <CgDanger className="text-danger" />
    </div>
  );

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
                <h3 className="text-center text-white">Sign In Form</h3>
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
                      onChange={handleOnChange}
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

              {/* password */}
              <div className="mb-1 row p-2 justify-content-center align-content-center">
                <div className="input-container">
                  <div className="input-wrapper">
                    <input
                      type="password"
                      className="input-field"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                    />
                    <label
                      htmlFor="password"
                      className={`input-label ${
                        password.trim() !== "" ? "input-label-used" : ""
                      }`}
                    >
                      Password
                    </label>
                    <span className="input-icon">
                      <BiLock />
                    </span>
                    <div className="input-line"></div>
                  </div>
                </div>

                {/* MENSAJE Validacion*/}
                {error.id === 2 && errorAlert}
              </div>

              {/* Button */}
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success w-25 mb-4">
                  Sing Out
                </button>
              </div>

              {/* Link */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Link to="/register" className="text-decoration-none">
                  <span className="text-muted"> Don't have an account?</span>{" "}
                  Sign Up
                </Link>
              </div>

              {/* Link */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Link to="/forgot" className="text-decoration-none">
                  <span className="text-muted">Already have an account? </span>
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
