import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryCocktails } from "../Redux/Features/CocktailSlice";
import Spinner from "../Components/Spinner";
import CardDrink from "../Components/HomePage/CardDrink";
import { SweetAlertError } from "../SweetAlert/SweetAlert";
import SearchBox from "../Components/HomePage/SearchBox";
import { CiFaceFrown } from "react-icons/ci";

const HomePage = () => {
  const [modifiedCocktails, setModifiedCocktails] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => ({
    ...state.app,
  }));

  const dispatch = useDispatch();

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

  const getRandomCategory = () => {
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const category = getRandomCategory();

  useEffect(() => {
    dispatch(fetchCategoryCocktails({ category: category }));
    // eslint-disable-next-line
  }, []);

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

  if (modifiedCocktails.length < 0) {
    return (
      <Layout>
        <SearchBox />

        <div className="text-center my-5 bg-danger text-white mx-5 rounded py-3">
          <h3>
            No cocktail found with this term! <CiFaceFrown className="ms-2" />
          </h3>

          <p>Try another term there are many cocktails you can find</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="bg-white">
          {loading ? (
            <Spinner />
          ) : (
            <div className="" id="home">
              <SearchBox />

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
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
