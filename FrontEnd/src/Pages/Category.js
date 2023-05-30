import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryCocktails } from "../Redux/Features/CocktailSlice";
import Spinner from "../Components/Spinner";
import CardDrink from "../Components/HomePage/CardDrink";
import { SweetAlertError } from "../SweetAlert/SweetAlert";

const Category = () => {
  const categories = [
    "Ordinary Drink",
    "Cocktail",
    "Shake",
    "Other / Unknown",
    "Cocoa",
    "Shot",
    "Coffee / Tea",
    "Homemade Liqueur",
    "Punch / Party Drink",
    "Beer",
    "Soft Drink",
  ];

  const handleFilter = (category) => {
    dispatch(fetchCategoryCocktails({ category: category }));
  };

  const [modifiedCocktails, setModifiedCocktails] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => ({
    ...state.app,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      SweetAlertError(error);
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (cocktails.length > 0) {
      //si hay cocktails entonces mapeamos y abstraemos los datos que necesitamos
      const newCocktails = cocktails.map((cocktail) => {
        const { idDrink, strDrink, strDrinkThumb } = cocktail;
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
        };
      });

      setModifiedCocktails(newCocktails);
    } else {
      setModifiedCocktails([]);
    }

    // eslint-disable-next-line
  }, [cocktails, loading]);

  return (
    <>
      <Layout>
        {/* Masthead*/}
        <header className="masthead bg-danger" id="about">
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center text-white">
                  {/* Page heading*/}
                  <h1 className="mb-5">Filter By Category</h1>

                  <div className="row">
                    {categories.map((category, index) => {
                      return (
                        <div key={index} className="col-12 col-md-4 mb-3">
                          <button
                            type="button"
                            className="btn btn-light"
                            style={{ width: "100%" }}
                            onClick={() => handleFilter(category)}
                          >
                            {category}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white">
          {loading ? (
            <Spinner />
          ) : (
            <div className="row my-5">
              {modifiedCocktails.map((cocktail) => (
                <div
                  key={cocktail.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
                >
                  <CardDrink cocktail={cocktail} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Category;
