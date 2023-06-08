import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");

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
                <h3 className="text-center text-white">Forgot Password</h3>
              </div>

              {/* Email */}
              <div className="mb-1 mt-4 row p-2 justify-content-center align-content-center">
                <div className="input-container">
                  <div className="input-wrapper">
                    <input
                      type="email"
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
              </div>

              {/* Button */}
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success w-25 mb-4">
                  Recover Password
                </button>
              </div>

              {/* Link */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Link to="/login" className="text-decoration-none"><span className="text-muted">Return to</span> Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Forgot;
