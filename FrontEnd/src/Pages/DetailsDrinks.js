import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { usePrivateRoute } from "../Hooks/usePrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import {
  SweetAlertError,
  SweetAlertSuccessRedux,
} from "../SweetAlert/SweetAlert";
import {
  getDrinks,
  setCurrentDrink,
  setLikeDrink,
  deleteDrink,
  clearState,
} from "../Redux/Drinks/DrinkSlice";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const DetailsDrinks = () => {
  //si no hay usuario se redireciona a home
  usePrivateRoute();
  //funciones de redux y router
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, errorRedux, drinks, drinkCurrent } = useSelector((state) => ({
    ...state.drinks,
  }));

  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams(); //id de la bebida
  const [like, setLike] = useState(false);
  const [meLike, setMeLike] = useState("text-secondary");
  const [marginRight, setMarginRight] = useState("0px");

  const localStorageDrink = () => {

    return drinkCurrent
      ? drinkCurrent
      : JSON.parse(localStorage.getItem("drink"));
  };

  //si esta en el local storage se recupera si no se pone null
  const [drink, setDrink] = useState(localStorageDrink());

  useEffect(() => {

    if(!localStorage.getItem("drink")){
      //obtener todos los drinks
      dispatch(getDrinks());

      //filtrar para obtener la bebida actual
      const tempDrink = drinks.find((drink) => drink.id === parseInt(id));

      setDrink({ ...tempDrink });
      setCurrentDrink({ data: tempDrink });
      /* console.log(tempDrink); */
    }

    if (!id) {
      //si no existe el id o usuario
      navigate("/list-drinks");
    }

    // eslint-disable-next-line
  }, []);


  /* console.log(drink); */

  useEffect(() => {
    // Verificar si drink.likes es null o undefined
    if (drink && drink.hasOwnProperty("likes") && Array.isArray(drink.likes) && user) {
      const likes = drink.likes ?? [];

      if (likes.find((like) => like === user.id) && like) {
        //agregar like
        const newLikes = likes.filter((like) => like !== user.id);
        setDrink({
          ...drink,
          likes: [...newLikes],
        });

        setCurrentDrink({ data: drink });

      } else if(!likes.find((like) => like === user.id) && like) {
        //remover like
        const newLikes = [...likes, parseInt(user.id)];

        setDrink({
          ...drink,
          likes: [...newLikes],
        });

        setCurrentDrink({ data: drink });
      }

      //indicador de like, diseño
      if(likes.find((like) => like === user.id) ){
        setMeLike("text-primary");
      }else{
        setMeLike("text-secondary");
      }

      //margen derecho, diseño de likes
      if (likes.length > 10) {
        setMarginRight("-6px");
      } else if (likes.length > 100) {
        setMarginRight("-10px");
      } else {
        setMarginRight("0px");
      }
    }
    // eslint-disable-next-line
  }, [like]);

  useEffect(() => {
    // si hay error
    if (errorRedux) {
      SweetAlertError(errorRedux);
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    }

    if (like && message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      dispatch(clearState());
      setLike(false);
    }

    //si hay mensaje
    if (message && !like) {
      SweetAlertSuccessRedux(message);
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    }

    // eslint-disable-next-line
  }, [errorRedux, message, like]);

  const handleLike = (e) => {
    setLike(true);

    //petición para dar like
    dispatch(
      setLikeDrink({
        data: { idDrink: drink.id, idUser: user.id, token: token },
      })
    );

    /* console.log(drink.likes); */
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to eliminate this drink?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C0392B",
      cancelButtonColor: "#99A3A4",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        //petición para eliminar
        dispatch(deleteDrink({ data: drink.id }));

        setTimeout(() => {
          dispatch(clearState());
          //redireccionar
          navigate("/list-drinks");
        }, 2000);
      }
    });

    //actualizar los drinks
    dispatch(getDrinks());
  };

  //si esta cargando
  if (loading || !drink || drink === null || drink === undefined) {
    /* console.log("entro?"); */
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
      {drink && !loading && (
        <Layout>
          <div className="container my-5">
            {/* toast de like */}
            {like && <ToastContainer style={{ width: "400px" }} />}

            <div className="row">
              <div className="col-lg-8">
                {/* Drink */}
                <div className="card mb-4 shadow-3">
                  <div className="card-header">
                    <h2 className="card-title text-center">{drink?.name}</h2>
                  </div>
                  <div className="card-body py-5 d-flex justify-content-center align-items-center">
                    <img
                      className="rounded-2 card-img-bottom img-fluid"
                      src={drink.ruta}
                      style={{ maxWidth: "600px", maxHeight: "600px" }}
                      alt={drink?.name}
                    />
                  </div>

                  {/* likes */}
                  <div className="mt-2 mb-5 d-flex justify-content-around align-items-center">
                    <button
                      className="btn btn-light shadow-2"
                      onClick={handleLike}
                    >
                      <div className="likes-icon">
                        <AiFillLike
                          className={meLike}
                          style={{ fontSize: "1.5rem" }}
                        />
                        <span
                          className="likes-count text-muted"
                          style={{ marginRight: marginRight }}
                        >
                          {drink?.likes?.length}
                        </span>
                      </div>
                    </button>

                    {/* Buttons */}
                    {user?.id === drink?.userId ? (
                      <>
                        <Link
                          to={`/edit-drink/${drink?.id}`}
                          className="btn btn-warning shadow-2"
                        >
                          <MdModeEdit style={{ fontSize: "1.5rem" }} />
                        </Link>

                        <button
                          className="btn btn-danger shadow-2"
                          onClick={handleDelete}
                        >
                          <MdDeleteForever style={{ fontSize: "1.5rem" }} />
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* Side data drink*/}
              <div className="col-lg-4">
                {/* Categories*/}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Categories</div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <p className="card-text">{drink?.category}</p>
                      </li>
                      <li>
                        <p className="card-text text-danger">
                          {drink?.alcoholic}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Ingredients */}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Ingredients</div>
                  <div className="card-body">
                    <ol className="list-unstyled list-group-numbered">
                      {drink?.ingredients?.map((ingredient, index) => {
                        if (ingredient) {
                          //  si el ingrediente no es nulo
                          return (
                            <li
                              className="list-group-item d-flex justify-content-between align-items-start"
                              key={index}
                            >
                              <div className="ms-2 me-auto">
                                <p className="card-text">{ingredient}</p>
                              </div>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ol>
                  </div>
                </div>
                {/* Measures */}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Measures</div>
                  <div className="card-body">
                    <ol className="list-unstyled list-group-numbered">
                      {drink?.measures?.map((measure, index) => {
                        if (measure) {
                          //  si el medida no es nulo
                          return (
                            <li
                              className="list-group-item d-flex justify-content-between align-items-start"
                              key={index}
                            >
                              <div className="ms-2 me-auto">
                                <p className="card-text">{measure}</p>
                              </div>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ol>
                  </div>
                </div>
                {/* type of glass */}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Type of Glass</div>
                  <div className="card-body">
                    <p className="card-text">{drink?.glass}</p>
                  </div>
                </div>
                {/* preparation */}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Preparation</div>
                  <div className="card-body">
                    <p className="card-text">{drink?.preparation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default DetailsDrinks;
