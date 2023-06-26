import React,{useEffect} from "react";
import Layout from "../Components/Layout";
import SearchBox from "../Components/Drink/SearchBox";
import { usePrivateRoute } from "../Hooks/usePrivateRoute";
import CardDrink from "../Components/Drink/CardDrink";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import {
  SweetAlertError,
} from "../SweetAlert/SweetAlert";
import { getDrinks, clearState, setCurrentDrink } from "../Redux/Drinks/DrinkSlice";

const Coktails = () => {
  usePrivateRoute();

  const { loading, errorRedux, drinks } = useSelector((state) => ({
    ...state.drinks,
  }));

  const [listDrinks, setListDrinks] = React.useState([...drinks]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrinks());
    dispatch( setCurrentDrink({ data: null }) );
    // eslint-disable-next-line
  }, []);

  useEffect(() => { 
    setListDrinks([...drinks])
  }, [drinks]);

  useEffect(() => {
    // si hay error
    if (errorRedux) {
      SweetAlertError(errorRedux);
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    }

    // eslint-disable-next-line
  }, [errorRedux]);

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
        <div className="" id="list-drinks">
          <SearchBox setListDrinks={setListDrinks}/>

          <div className="row my-5">
            {listDrinks.map((drink) => (
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
