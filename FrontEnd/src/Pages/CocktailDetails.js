import React from "react";
import Layout from "../Components/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import { tempCocktails } from "../Assets/DataPages";
import { AiFillLike } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const CocktailDetails = () => {
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const navigate = useNavigate();

  if (!id || !user) {
    //si no existe el id o usuario
    navigate("/");
  }

  console.log(id);
  const cocktail = tempCocktails.find(
    (cocktail) => cocktail.id === parseInt(id)
  );
  console.log(cocktail);
  console.log(tempCocktails);

  const marginRight =
    cocktail.likes.length > 10 && cocktail.likes.length < 100
      ? "-6px"
      : cocktail.likes.length > 100
      ? "-10px"
      : "0px";

  const meLike = cocktail.likes.find((like) => like === user.id)
    ? "text-primary"
    : "text-secondary";

  return (
    <>
      <Layout>
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8">
              {/* Drink */}
              <div className="card mb-4 shadow-3">
                <div className="card-header">
                  <h2 className="card-title text-center">{cocktail.name}</h2>
                </div>
                <div className="card-body py-5 d-flex justify-content-center align-items-center">
                  <img
                    className="rounded-2 card-img-bottom img-fluid"
                    src={cocktail.image}
                    style={{ maxWidth: "600px", maxHeight: "600px" }}
                    alt={cocktail.name}
                  />
                </div>

                {/* likes */}
                <div className="mt-2 mb-5 d-flex justify-content-around align-items-center">
                  <div className="likes-icon">
                    <AiFillLike
                      className={meLike}
                      style={{ fontSize: "1.5rem" }}
                    />
                    <span
                      className="likes-count text-muted"
                      style={{ marginRight: marginRight }}
                    >
                      {cocktail.likes.length}
                    </span>
                  </div>

                  {/* Buttons */}
                  <Link
                    to={`/drik-user-edit/${cocktail.id}`}
                    className="btn btn-warning"
                  >
                    <MdModeEdit />
                  </Link>
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
                      <p className="card-text">{cocktail.category}</p>
                    </li>
                    <li>
                      <p className="card-text text-danger">
                        {cocktail.alcoholic}
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
                    {cocktail.ingredients.map((ingredient, index) => {
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
                    {cocktail.measures.map((measure, index) => {
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
                  <p className="card-text">{cocktail.glass}</p>
                </div>
              </div>
              {/* preparation */}
              <div className="card mb-4 shadow-2">
                <div className="card-header fw-bold">Preparation</div>
                <div className="card-body">
                  <p className="card-text">{cocktail.preparation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CocktailDetails;
