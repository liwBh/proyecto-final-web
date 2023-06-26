import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiDrink } from "react-icons/bi";
import { useSelector } from "react-redux";
/* import { fetchSearchCocktails } from "../../Redux/Features/CocktailSlice"; */
import { SweetAlertError } from "../../SweetAlert/SweetAlert";

const SearchBox = ({ setListDrinks }) => {
  const { drinks } = useSelector((state) => ({
    ...state.drinks,
  }));

  const { user } = useSelector((state) => state.auth);

  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState(1);

  const handleFilter = (e) => {
    //console.log(e.target.value);
    const filter = parseInt(e.target.value);
    setSearchBy(filter);

    switch (filter) {
      //ver todos
      case 1:
        setListDrinks([...drinks]);
        break;
      //ver mis bebidas
      case 2:
        setListDrinks([...drinks.filter((drink) => drink.userId === user.id)]);
        break;
      //ver bebidas de otros
      case 3:
        setListDrinks([...drinks.filter((drink) => drink.userId !== user.id)]);
        break;
      default:
        setListDrinks([...drinks]);
        break;
    }
  };

  /* const dispatch = useDispatch(); */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword) {
      //mensaje de error
      SweetAlertError("Please enter a search term");
      return;
    }

    //filtrar por keyword
    const filter = drinks.filter((drink) => 
      drink.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setListDrinks([...filter]);

    //reseteo de los campos
    setKeyword("");
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
                        placeholder="Search..."
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
                        onChange={handleFilter}
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
