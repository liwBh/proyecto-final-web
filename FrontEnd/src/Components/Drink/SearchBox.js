import React, { useState } from "react";
import { FaSearch, } from "react-icons/fa";
import { BiDrink } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { fetchSearchCocktails } from "../../Redux/Features/CocktailSlice";
import { SweetAlertError } from "../../SweetAlert/SweetAlert";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState(1);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword) {
      //mensaje de error
      SweetAlertError("Please enter a search term");
      return;
    }

    //selecionar la url de busqueda
    let url = "";

    switch (searchBy) {
      //Por nombre
      case 1:
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`;
        break;

      //por primera letra
      case 2:
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${keyword}`;
        break;

      //por ingrediente
      case 3:
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${keyword}`;
        break;

      default:
        SweetAlertError("Please enter a search term and select a search type");
        break;
    }

    if (!url) {
      return;
    }

    //enviar la url al action
    dispatch(fetchSearchCocktails({ url }));

    //reseteo de los campos
    setKeyword("");
    setSearchBy(1);
  };

  return (
    <>
      {/* Masthead*/}
      <header className="masthead bg-danger">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="text-center text-white">
                {/* Page heading*/}
                <h1 className="mb-5">
                  Find the best cocktail recipes online from our users{" "}
                  <BiDrink className="ms-2" />
                </h1>

                <form
                  className="form-subscribe"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  {/* Search input*/}
                  <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-auto mb-2 mb-md-0">
                      <input
                        className="form-control form-control-lg"
                        id="keyword"
                        type="text"
                        placeholder="Search for a drink by"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-auto">
                      <select
                        className="form-select-lg"
                        aria-label="Default select example"
                        id="searchBy"
                        name="searchBy"
                        value={searchBy}
                        onChange={(e) => setSearchBy(parseInt(e.target.value))}
                      >
                        <option value={1}>All</option>
                        <option value={2}>Me drinks</option>
                        <option value={3}>others drinks</option>
                      </select>
                    </div>

                    <div className="col-auto">
                      <button
                        className="btn btn-outline-light btn-lg "
                        id="submitButton"
                        type="submit"
                      >
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SearchBox;
