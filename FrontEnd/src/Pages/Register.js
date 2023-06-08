import React, { useState } from "react";
import Layout from "../Components/Layout";
import { BiLock } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, lastName, email, password, passwordConfirm } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmmit = (e) => {
    e.preventDefault();
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
                    />
                    <label
                      htmlFor="passwordConfirm"
                      className={`input-label ${
                        passwordConfirm.trim() !== "" ? "input-label-used" : ""
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
              </div>

              {/* Button */}
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success w-25 mb-4">
                  Sing Up
                </button>
              </div>

              {/* Link */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Link to="/login" className="text-decoration-none">
                  <span className="text-muted">Have an account?</span> Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
