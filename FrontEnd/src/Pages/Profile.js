import React, { useState, useEffect, useRef } from "react";
import Layout from "../Components/Layout";
import { usePrivateRoute } from "../Hooks/usePrivateRoute";
import { BiLock, BiEditAlt } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { regexEmail, regexLetterAndSpace } from "../Assets/ExpresionRegular";
import { clearState, deleteUser, updateUser } from "../Redux/Users/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import {
  SweetAlertError,
  SweetAlertSuccessRedux,
} from "../SweetAlert/SweetAlert";
import { ToastContainer, toast } from "react-toastify";
import {
  loginOutUser,
  upateDataUser,
  getLocalStorage,
} from "../Redux/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  //protecion de la ruta
  usePrivateRoute();
  //obtener el usuario
  const { user } = useSelector((state) => state.auth);

  const { loading, message, errorRedux } = useSelector((state) => ({
    ...state.users,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refBTNClose = useRef(null);

  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");

  const [formData, setFormData] = useState({
    id: user?.id,
    name: user?.nombre,
    lastName: user?.apellidos,
    email: user?.correoElectronico,
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    id: 0,
    status: false,
    message: "",
  });

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
    dispatch(updateUser({ data: formData }));
    dispatch(upateDataUser({ data: formData }));
    dispatch(getLocalStorage());
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

  const errorAlert = (
    <div className="text-danger my-2">
      {error.message} <CgDanger className="text-danger" />
    </div>
  );

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

      setTimeout(() => {
        dispatch(clearState());
      }, 3000);
    }

    // eslint-disable-next-line
  }, [errorRedux, message]);

  const handleEdit = () => {
    setEdit(!edit);

    toast.warn("You can update your information now", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDelete = () => {
    if (confirmDelete === "") {
      toast.warn("You must enter the confirmation text", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (confirmDelete !== `I ${user?.nombre} ${user?.apellidos} agree`) {
      toast.warn("The confirmation text is not the same", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    //llamar al backend
    dispatch(deleteUser({ id: user?.id }));
    //cerrar sesion
    dispatch(loginOutUser());
    //cerrar modal
    refBTNClose.current.click();
    //redireccionar
    navigate("/");
  };

  //si esta cargando
  if (loading || !user) {
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
          {edit && <ToastContainer style={{ width: "400px" }} />}

          <div className="col-md-6 col-10">
            <div className="my-5">
              <div className="bg-dark text-white rounded-3 d-flex justify-content-around align-items-center">
                <MdDeleteForever
                  className="text-danger"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteCountModal"
                />

                <h3 className="text-center text-white">User profile</h3>

                <BiEditAlt
                  className="text-warning"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                  onClick={handleEdit}
                />
              </div>

              <form
                className="mt-2 bg-light  form-control shadow-3"
                onSubmit={handleSubmmit}
                autoComplete="off"
              >
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
                        readOnly={!edit}
                      />
                      <label
                        htmlFor="name"
                        className={`input-label ${
                          name !== "" ? "input-label-used" : ""
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
                        readOnly={!edit}
                      />
                      <label
                        htmlFor="lastName"
                        className={`input-label ${
                          lastName !== "" ? "input-label-used" : ""
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
                        readOnly={!edit}
                      />
                      <label
                        htmlFor="email"
                        className={`input-label ${
                          email !== "" ? "input-label-used" : ""
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

                {edit && (
                  <div className="animate__animated animate__fadeInDown">
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
                              password !== "" ? "input-label-used" : ""
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
                              passwordConfirm !== "" ? "input-label-used" : ""
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
                      <button
                        type="submit"
                        className="btn btn-success w-50 mb-4"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            {/* modal delete */}
            <div
              className="modal fade"
              id="deleteCountModal"
              tabIndex={-1}
              aria-labelledby="deleteCountLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-danger text-white">
                    <h5
                      className="modal-title d-flex align-items-center gap-4"
                      id="deleteCountLabel"
                    >
                      Delete my account{" "}
                      <AiFillWarning
                        className="text-white"
                        style={{ fontSize: "1.5rem" }}
                      />
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      ref={refBTNClose}
                    />
                  </div>
                  <div className="modal-body">
                    <ToastContainer style={{ width: "400px" }} />
                    <p className="text-muted">
                      <span className="text-decoration-underline text-primary">
                        {" "}
                        I {`${user?.nombre} ${user?.apellidos}`} agree
                      </span>{" "}
                      to delete my account permanently, to do so enter the
                      underlined text
                    </p>
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Verify delete account:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="confirmDelete"
                          name="confirmDelete"
                          value={confirmDelete}
                          onChange={(e) => setConfirmDelete(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
