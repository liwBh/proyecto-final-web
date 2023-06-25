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
import { getDrinks, deleteDrink, clearState } from "../Redux/Drinks/DrinkSlice";
import Swal from "sweetalert2";

const DetailsDrinks = () => {
  usePrivateRoute();

  const { loading, message, errorRedux, drinks } = useSelector((state) => ({
    ...state.drinks,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrinks());
    // eslint-disable-next-line
  }, []);

  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const navigate = useNavigate();

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
        //redireccionar
        navigate("/list-drinks");
      }, 2000);
    }

    // eslint-disable-next-line
  }, [errorRedux, message]);

  if (!id || !user) {
    //si no existe el id o usuario
    navigate("/");
  }

  const [drink, setDrink] = useState(
    drinks.find((drink) => drink.id === parseInt(id))
  );
  const [meLike, setMeLike] = useState(
    drink.likes.find((like) => like === user.id)
      ? "text-primary"
      : "text-secondary"
  );
  const [marginRight, setMarginRight] = useState(
    drink.likes.length > 10 && drink.likes.length < 100
      ? "-6px"
      : drink.likes.length > 100
      ? "-10px"
      : "0px"
  );

  /* const drink = drinks.find((drink) => drink.id === parseInt(id)); */
  /* console.log(id);
  console.log(drink);
  console.log(drinks); */

  /*   const marginRight =
    drink.likes.length > 10 && drink.likes.length < 100
      ? "-6px"
      : drink.likes.length > 100
      ? "-10px"
      : "0px"; */

  /* const meLike = drink.likes.find((like) => like === user.id)
    ? "text-primary"
    : "text-secondary"; */

  const handleLike = () => {
    console.log("like");
    //petición para dar like
    //dispatch(setLikeDrink({ id: drink.id, user_id: user.id }));

    //actualizar los drinks
    dispatch(getDrinks());

    //actualizar los state
    setDrink(drinks.find((drink) => drink.id === parseInt(id)));
    setMeLike(
      drink.likes.find((like) => like === user.id)
        ? "text-primary"
        : "text-secondary"
    );
    setMarginRight(
      drink.likes.length > 10 && drink.likes.length < 100
        ? "-6px"
        : drink.likes.length > 100
        ? "-10px"
        : "0px"
    );
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
      }
    });

    //actualizar los drinks
    dispatch(getDrinks());
  };

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
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8">
              {/* Drink */}
              <div className="card mb-4 shadow-3">
                <div className="card-header">
                  <h2 className="card-title text-center">{drink.name}</h2>
                </div>
                <div className="card-body py-5 d-flex justify-content-center align-items-center">
                  <img
                    className="rounded-2 card-img-bottom img-fluid"
                    src={drink.image}
                    style={{ maxWidth: "600px", maxHeight: "600px" }}
                    alt={drink.name}
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
                        {drink.likes.length}
                      </span>
                    </div>
                  </button>

                  {/* Buttons */}
                  {user.id === drink.userId ? (
                    <>
                      <Link
                        to={`/edit-drink/${drink.id}`}
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
                      <p className="card-text">{drink.category}</p>
                    </li>
                    <li>
                      <p className="card-text text-danger">{drink.alcoholic}</p>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Ingredients */}
              <div className="card mb-4 shadow-2">
                <div className="card-header fw-bold">Ingredients</div>
                <div className="card-body">
                  <ol className="list-unstyled list-group-numbered">
                    {drink.ingredients.map((ingredient, index) => {
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
                    {drink.measures.map((measure, index) => {
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
                  <p className="card-text">{drink.glass}</p>
                </div>
              </div>
              {/* preparation */}
              <div className="card mb-4 shadow-2">
                <div className="card-header fw-bold">Preparation</div>
                <div className="card-body">
                  <p className="card-text">{drink.preparation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DetailsDrinks;
