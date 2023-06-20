import React from "react";
import Layout from "../Components/Layout";

import { usePrivateRoute } from "../Hooks/usePrivateRoute";
import { tempCocktails } from "../Assets/DataPages";
import CardCocktail from "../Components/Cocktail/CardCocktail";

const Coktails = () => {
  usePrivateRoute();

  return (
    <>
      <Layout>
        <div className="" id="home">
          {/* <SearchBox /> */}

          <div className="row my-5">
            {tempCocktails.map((cocktail) => (
              <div
                key={cocktail.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
              >
               <CardCocktail cocktail={cocktail} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Coktails;
