import React from "react";
import Layout from "../Components/Layout";
import SearchBox from "../Components/Drink/SearchBox";
import { usePrivateRoute } from "../Hooks/usePrivateRoute";
import { tempDrinks } from "../Assets/DataPages";
import CardDrink from "../Components/Drink/CardDrink";

const Coktails = () => {
  usePrivateRoute();

  return (
    <>
      <Layout>
        <div className="" id="list-drinks">
          <SearchBox /> 

          <div className="row my-5">
            {tempDrinks.map((drink) => (
              <div
                key={drink.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
              >
                <CardDrink drink={drink} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Coktails;
