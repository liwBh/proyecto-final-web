import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { BiLock } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { MdMarkEmailRead } from "react-icons/md";
import { regexEmail, regexLetterAndSpace } from "../Assets/ExpresionRegular";
import { BiMailSend } from "react-icons/bi";
import { createUser, clearState } from "../Redux/Users/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import {
  SweetAlertError,
  SweetAlertSuccessRedux,
} from "../SweetAlert/SweetAlert";

const Register = () => {
  const { loading, message, errorRedux } = useSelector((state) => ({
    ...state.users,
  }));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [animate, setAnimate] = useState(false);
  const [style, setStyle] = useState("animate__animated  animate__zoomIn");
  const [verify, setVerify] = useState(false);

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

  const verifyAlert = (
    <div className="my-5">
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <p className="display-6 text-muted">
          You must verify your account, for this check your email
        </p>

        {animate ? (
          <BiMailSend
            className="animate__animated  animate__backInLeft "
            style={{ fontSize: "6rem" }}
          />
        ) : (
          <MdMarkEmailRead
            className={`${style}`}
            style={{ fontSize: "6rem" }}
          />
        )}
      </div>
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

  const handleInput = (e) => {
    if (e.target.name === "name") {
      if (!regexLetterAndSpace.test(e.target.value)) {
        showErroAlert("Invalid character removed", 1);
        e.target.value = e.target.value.slice(0, -1);
      }
    }

    if (e.target.name === "lastName") {
      if (!regexLetterAndSpace.test(e.target.value)) {
        showErroAlert("Invalid character removed", 2);
        e.target.value = e.target.value.slice(0, -1);
      }
    }
  };

  const handleValidation = (e) => {
    if (name.trim() === "") {
      showErroAlert("The name is required", 1);
      return true;
    }

    if (lastName.trim() === "") {
      showErroAlert("The last name is required", 2);
      return true;
    }

    if (email.trim() === "") {
      showErroAlert("The email is required", 3);
      return true;
    }

    if (!regexEmail.test(email)) {
      showErroAlert("The email is invalid", 3);
      return true;
    }

    if (password.trim() === "") {
      showErroAlert("The password is required", 4);
      return true;
    }

    if (password.trim().length < 8 || password.trim().length > 16) {
      showErroAlert(
        "The password must be a minimum of 8 and a maximum of 16 characters",
        4
      );
      return true;
    }

    if (passwordConfirm.trim() === "") {
      showErroAlert("The password confirm is required", 5);
      return true;
    }

    if (passwordConfirm.trim() !== password.trim()) {
      showErroAlert("The password confirm is not equal to password", 5);
      return true;
    }

    return false;
  };

  const { name, lastName, email, password, passwordConfirm } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmmit = (e) => {
    e.preventDefault();

    //validacion de campos
    if (handleValidation()) {
      return;
    }

    //peticion a backend
    dispatch(createUser({ data: formData }));

    setFormData({
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  };

  useEffect(() => {
    //limpiar formulario, del autocomplete
    setFormData({
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });

    // si hay error
    if (errorRedux) {
      SweetAlertError(errorRedux);
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    }

    //si hay mensaje
    if (message) {
      SweetAlertSuccessRedux(message);

      setTimeout(() => {  
        setVerify(true);
        dispatch(clearState());
      },3000);

      
    }

    // eslint-disable-next-line
  }, [errorRedux, message]);

  useEffect(() => {
    if (verify) {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 2000);

      setTimeout(() => {
        setStyle("text-success animate__animated  animate__bounceIn");
      }, 3500);
    }
  }, [verify]);

  //si esta cargando
  if (loading) {
    return (
      <>
        <Layout>
          <Spinner />
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <div className="row mt-2 justify-content-center align-content-center">
          <div className="col-md-6 col-10">
            {verify ? (
              verifyAlert
            ) : (
              <form
                className="my-5 bg-light shadow-3 p-2 rounded-1 form-control"
                onSubmit={handleSubmmit}
                autoComplete="off"
              >
                <div className="bg-dark py-3 text-white rounded-3">
                  <h3 className="text-center text-white">Sign Up Form</h3>
                </div>

                {/* name */}
                <div className="mb-1 row p-2 mt-4 justify-content-center align-content-center">
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="input-field"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                        onInput={handleInput}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="name"
                        className={`input-label ${
                          name.trim() !== "" ? "input-label-used" : ""
                        }`}
                      >
                        Name
                      </label>
                      <span className="input-icon">
                        <FaUser />
                      </span>
                      <div className="input-line"></div>
                    </div>
                  </div>
                  {/* MENSAJE Validacion*/}
                  {error.id === 1 && errorAlert}
                </div>

                {/* lastName */}
                <div className="mb-1 row p-2 justify-content-center align-content-center">
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="input-field"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        onInput={handleInput}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="lastName"
                        className={`input-label ${
                          lastName.trim() !== "" ? "input-label-used" : ""
                        }`}
                      >
                        Last Name
                      </label>
                      <span className="input-icon">
                        <FaUserFriends />
                      </span>
                      <div className="input-line"></div>
                    </div>
                  </div>
                  {/* MENSAJE Validacion*/}
                  {error.id === 2 && errorAlert}
                </div>

                {/* Email */}
                <div className="mb-1 row p-2 justify-content-center align-content-center">
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="input-field"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        autoComplete="off"
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
                  {error.id === 3 && errorAlert}
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
                        autoComplete="off"
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
                  {error.id === 4 && errorAlert}
                </div>

                {/* password Confirm */}
                <div className="mb-3 row p-2 justify-content-center align-content-center">
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="password"
                        className="input-field"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="passwordConfirm"
                        className={`input-label ${
                          passwordConfirm.trim() !== ""
                            ? "input-label-used"
                            : ""
                        }`}
                      >
                        Password Confirm
                      </label>
                      <span className="input-icon">
                        <BiLock />
                      </span>
                      <div className="input-line"></div>
                    </div>
                  </div>
                  {/* MENSAJE Validacion*/}
                  {error.id === 5 && errorAlert}
                </div>

                {/* Button */}
                <div className="d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-success w-50 mb-4">
                    Sign Up
                  </button>
                </div>

                {/* Link */}
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <Link to="/login" className="text-decoration-none">
                    <span className="text-muted">Have an account?</span> Sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
