import React, { useEffect, useState } from "react";
import Logo2 from "../Images/logo-2.png";
import { useParams, useNavigate } from "react-router-dom";
import { activateUser, clearState } from "../Redux/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  SweetAlertError,
  SweetAlertSuccessRedux,
} from "../SweetAlert/SweetAlert";

const VerifyEmail = () => {
  const { message, errorRedux } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();

  const [shadow, setShadow] = useState("shadow-1");
  const [animate, setAnimate] = useState("");

  const { u, c } = useParams();
  const navigate = useNavigate();

  const handleShadow = () => {
    setTimeout(() => {
      setShadow("");
      setAnimate("animate_animated animate__heartBeat");
    }, 1500);
  };

  useEffect(() => {
    handleShadow();
  }, [shadow, animate]);

  const handleVeryfyEmail = () => {
    //realizar la peticion al servidor

    const data = {
      email: u,
      activationNumber: c,
    }
    console.log(data)
    dispatch(
      activateUser({data})
    );
  };

  useEffect(() => {
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

      //redireccionar al Login
      setTimeout(() => {
        navigate("/login");
        dispatch(clearState());
      }, 2000);
    }

    // eslint-disable-next-line
  }, [errorRedux, message]);

  return (
    <div className="bg-dark h-100">
      <div className="container bg-light h-100">
        <div className="row">
          <div className="col-12 text-center mt-5">
            <h2>Welcome to the Web Bar</h2>
            <p className="lead">Enjoy our selection of delicious drinks!</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5 d-flex justify-content-center align-items-center">
            <img
              src={Logo2}
              alt="Logo"
              width={200}
              height={200}
              className={`img-fluid ${shadow} rounded-3 animate__animated  animate__flip`}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center mt-5">
            <h3>Explore our options</h3>
            <p>
              Here you will find a wide variety of cocktails to satisfy your
              tastes.
            </p>
            <p>
              Click on the following link to log in and access our complete
              letter:
            </p>
            <button
              type="button"
              className={`btn btn-dark btn-lg mt-3 ${animate}`}
              onClick={handleVeryfyEmail}
            >
              Sing In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;