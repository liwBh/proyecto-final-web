import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleCocktail,
  clearError,
} from "../Redux/Features/CocktailSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import { SweetAlertError } from "../SweetAlert/SweetAlert";

const ProductDetails = () => {
  const { loading, cocktail, error } = useSelector((state) => ({
    ...state.app,
  }));
  const dispatch = useDispatch();
  const { id } = useParams();
  const [modifiedCocktail, setModifiedCocktail] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));

    const timeoutId = setTimeout(() => {
      dispatch(clearError());
    }, 1000);
    return () => clearTimeout(timeoutId);

    // eslint-disable-next-line
  }, [id, dispatch]);

  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        idDrink,
        strDrink,
        strDrinkThumb,
        strAlcoholic,
        strGlass,
        strInstructions,
        strCategory,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      } = cocktail[0];

      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
      ];

      const measures = [
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      ];

      const newCocktail = [
        idDrink,
        strDrink,
        strDrinkThumb,
        strAlcoholic,
        strGlass,
        strInstructions,
        strCategory,
        ingredients,
        measures,
      ];
      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail([]);
    }
  }, [cocktail, id]);

  //redireccionar
  const navigate = useNavigate();

  if (error) {
    SweetAlertError(error);
    //dispatch(clearError());

    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  if (!modifiedCocktail || loading) {
    return (
      <>
        <Layout>
          <Spinner />
        </Layout>
      </>
    );
  }

  const [
    idDrink,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strGlass,
    strInstructions,
    strCategory,
    ingredients,
    measures,
  ] = modifiedCocktail;

  return (
    <>
      <Layout>
        {!loading && modifiedCocktail.length > 0 ? (
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-8">
                {/* Drink */}
                <div className="card mb-4 shadow-3">
                  <div className="card-header">
                    <h2 className="card-title text-center">{strDrink}</h2>
                  </div>
                  <div
                    className="card-body py-5 d-flex justify-content-center align-items-center"
                  >
                    <img
                      className="rounded-2 card-img-bottom img-fluid"
                      src={strDrinkThumb}
                      style={{ maxWidth: "600px", maxHeight: "600px" }}
                      alt={`Drink ${strDrink} - ${idDrink}`}
                    />
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
                        <p className="card-text">{strCategory}</p>
                      </li>
                      <li>
                        <p className="card-text text-danger">{strAlcoholic}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Ingredients */}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Ingredients</div>
                  <div className="card-body">
                    <ol className="list-unstyled list-group-numbered">
                      {ingredients.map((ingredient, index) => {
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
                      {measures.map((measure, index) => {
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
                    <p className="card-text">{strGlass}</p>
                  </div>
                </div>
                {/* preparation */}
                <div className="card mb-4 shadow-2">
                  <div className="card-header fw-bold">Preparation</div>
                  <div className="card-body">
                    <p className="card-text">{strInstructions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Layout>
    </>
  );
};

export default ProductDetails;
