import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import Dropzone from "../Components/Drink/Dropzone";
import { FaCocktail } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import {
  cocktailMeasures,
  categories,
  contentAlcoholic,
  glassName,
  ingredientsList,
  measureQuantitys,
} from "../Assets/DataPages";
import { regexInputDrink, regexTextArea } from "../Assets/ExpresionRegular";
import { CgDanger } from "react-icons/cg";
import { BiSave } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import { usePrivateRoute } from "../Hooks/usePrivateRoute";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import {
  SweetAlertError,
  SweetAlertSuccessRedux,
} from "../SweetAlert/SweetAlert";
import { getDrinks, updateDrink, clearState, setCurrentDrink } from "../Redux/Drinks/DrinkSlice";

const EditDrink = () => {
  usePrivateRoute();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    //si no existe el id o usuario
    navigate("/");
  }

  const { user } = useSelector((state) => state.auth);
  const { loading, message, errorRedux, drinks, drinkCurrent } = useSelector((state) => ({
    ...state.drinks,
  }));

  const localStorageDrink = () => {

    return drinkCurrent
      ? drinkCurrent
      : JSON.parse(localStorage.getItem("drink"));
  };

  const [measureQuantity, setMeasureQuantity] = useState("");
  const [measureType, setMeasureType] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [indexList, setIndexList] = useState(null);

  const [error, setError] = useState({
    id: 0,
    status: false,
    message: "",
  });

    //si esta en el local storage se recupera si no se pone null
    const [drink, setDrink] = useState(localStorageDrink());

    useEffect(() => {
  
      if(!localStorage.getItem("drink")){
        //obtener todos los drinks
        dispatch(getDrinks());
  
        //filtrar para obtener la bebida actual
        const tempDrink = drinks.find((drink) => drink.id === parseInt(id));
  
        setDrink({ ...tempDrink });
        setCurrentDrink({ data: tempDrink });
        console.log(tempDrink);
      }
  
      if (!id) {
        //si no existe el id o usuario
        navigate("/list-drinks");
      }
  
      // eslint-disable-next-line
    }, []);

  const [meDrink, setMeDrink] = useState({
    id: drink.id,
    name: drink.name,
    preparation: drink.preparation,
    measures: drink.measures,
    ingredients: drink.ingredients,
    image: null,
    ruta: drink.ruta,
    category: drink.category,
    alcoholic: drink.alcoholic,
    glass: drink.glass,
    likes: drink.likes,
    userId: user?.id
  });

  const handleValidateItem = () => {
    //validacion de cantidad de tipo
    if (measureType.trim() === "") {
      showErroAlert("The measure type is required", 5);
      return true;
    }
    //validacion de cantidad de medida
    if (
      measureQuantity.trim() === "" &&
      measureType.trim() !== "To your liking"
    ) {
      showErroAlert("The measure quantity is required", 4);
      return true;
    }

    //validacion de medidas maximo 14
    if (meDrink.measures.length === 14) {
      showErroAlert("The measure maximum is 14", 5);
      return true;
    }

    //validacion de cantidad de tipo
    if (ingredient.trim() === "") {
      showErroAlert("The ingredient is required", 9);
      return true;
    }

    return false;
  };

  const handleValidateSubmit = () => {
    if (meDrink.name.trim() === "") {
      showErroAlert("The name is required", 1);
      return true;
    }

    if (meDrink.alcoholic.trim() === "") {
      showErroAlert("The content alcoholic is required", 6);
      return true;
    }

    if (meDrink.category.trim() === "") {
      showErroAlert("The category is required", 7);
      return true;
    }

    if (meDrink.glass.trim() === "") {
      showErroAlert("The type glass is required", 8);
      return true;
    }

    if (meDrink.image === null) {
      showErroAlert("The image is required", 2);
      return true;
    }

    if (meDrink.preparation.trim() === "") {
      showErroAlert("The preparation is required", 3);
      return true;
    }

    if (meDrink.ingredients.length === 0 || meDrink.measures.length === 0) {
      showErroAlert("The ingredients and measures is required", 4);
      return true;
    }

    return false;
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      if (!regexInputDrink.test(e.target.value)) {
        showErroAlert("Only letters and numbers", 1);
        e.target.value = e.target.value.slice(0, -1);
      }
    }

    if (e.target.name === "preparation") {
      if (regexTextArea.test(e.target.value)) {
        showErroAlert("Only letters and numbers", 3);
        e.target.value = e.target.value.slice(0, -1);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion de campos
    if (handleValidateSubmit()) {
      return;
    }

    //consultar a backend
    dispatch(updateDrink({data: meDrink}));

    //redireccionar a la pagina de listado de bebidas
    setTimeout(() => {
      navigate("/list-drinks");
    }, 2000);
  };

  const handleChange = (e) => {
    setMeDrink({
      ...meDrink,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = (e) => {
    //validacion de campos
    if (handleValidateItem()) {
      return;
    }

    //se agrega la medida al array de medidas
    const newMeasure =
      measureQuantity === ""
        ? `${measureType}`
        : `${measureQuantity} ${measureType}`;

    setMeDrink({
      ...meDrink,
      measures: [...meDrink.measures, newMeasure],
      ingredients: [...meDrink.ingredients, ingredient],
    });

    //se limpian los campos
    setMeasureQuantity("");
    setMeasureType("");
    setIngredient("");
  };

  const showErroAlert = (message, id) => {
    setError({
      id: id,
      status: true,
      message: message,
    });

    setTimeout(() => {
      setError({
        id: 0,
        status: false,
        message: "",
      });
    }, 1500);
  };

  const handleDeleteItem = (index) => {
    const newMeasures = meDrink.measures.filter((measure, i) => i !== index);
    const newIngredients = meDrink.ingredients.filter(
      (ingredient, i) => i !== index
    );

    setMeDrink({
      ...meDrink,
      measures: newMeasures,
      ingredients: newIngredients,
    });
  };

  const hadleEditItem = (index) => {
    if (meDrink.measures[index] !== "To your liking") {
      //si tiene una cantidad de medida
      const text1 = meDrink.measures[index].split(" ")[0];
      const text2 = meDrink.measures[index].substring(`${text1}`.length + 1);
      setMeasureQuantity(text1);
      setMeasureType(text2);
    } else {
      //no tiene cantidadd de medida, es al gusto
      setMeasureQuantity("");
      setMeasureType(meDrink.measures[index]);
    }

    setIngredient(meDrink.ingredients[index]);

    setIndexList(index);
  };

  const handleUpdateItem = () => {
    //validacion de campos
    if (handleValidateItem()) {
      return;
    }

    //actualizar el array de medidas
    const newMeasures = [...meDrink.measures];
    newMeasures[indexList] = //Aqui falla
      measureType === "To your liking"
        ? measureType
        : `${measureQuantity} ${measureType}`;


    //actualizar el array de ingredientes
    const newIngredients = [...meDrink.ingredients];
    newIngredients[indexList] = ingredient;

    setMeDrink({
      ...meDrink,
      measures: newMeasures,
      ingredients: newIngredients,
    });

    //reseteo de campos
    setIndexList(null);
    setMeasureQuantity("");
    setMeasureType("");
    setIngredient("");
  };

  const errorAlert = (
    <div className="text-danger my-2">
      {error.message} <CgDanger className="text-danger" />
    </div>
  );

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
        <div className="mt-5">
          {/* Formulario */}
          <h2 className="d-flex justify-content-start align-items-center mb-5">
            Edit Drink {meDrink.name} <FaCocktail className="ms-2 text-dark" />
          </h2>

          <form onSubmit={handleSubmit} className="form-control mb-5">
            <div className="row">
              {/* input - select */}
              <div className="col-12 col-md-6">
                {/* name */}
                <div className="mb-3 mt-4">
                  <label
                    htmlFor="name"
                    className="form-label fw-bold text-muted"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={meDrink.name}
                    onChange={handleChange}
                    onInput={(e) => handleInput(e)}
                  />

                  {/* MENSAJE Validacion*/}
                  {error.id === 1 && errorAlert}
                </div>

                {/* Content Alcoholic */}
                <div className="mb-3">
                  <label
                    htmlFor="alcoholic"
                    className="form-label fw-bold text-muted"
                  >
                    Content Alcoholic
                  </label>

                  <select
                    className="form-select"
                    aria-label="Content Alcoholic"
                    name="alcoholic"
                    value={meDrink.alcoholic}
                    onChange={handleChange}
                  >
                    <option value={""}>Select content alcoholic</option>
                    {contentAlcoholic.map((alcohol, index) => (
                      <option key={index} value={alcohol}>
                        {alcohol}
                      </option>
                    ))}
                  </select>

                  {/* MENSAJE Validacion*/}
                  {error.id === 6 && errorAlert}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label
                    htmlFor="category"
                    className="form-label fw-bold text-muted"
                  >
                    Category drinks
                  </label>

                  <select
                    className="form-select"
                    aria-label="Category"
                    name="category"
                    value={meDrink.category}
                    onChange={handleChange}
                  >
                    <option value={""}>Select category drinks</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* MENSAJE Validacion*/}
                  {error.id === 7 && errorAlert}
                </div>

                {/* Glass */}
                <div className="mb-3">
                  <label
                    htmlFor="glass"
                    className="form-label fw-bold text-muted"
                  >
                    Type Glass
                  </label>

                  <select
                    className="form-select"
                    aria-label="Type Glass"
                    name="glass"
                    value={meDrink.glass}
                    onChange={handleChange}
                  >
                    <option value={""}>Select type glass</option>
                    {glassName.map((glass, index) => (
                      <option key={index} value={glass}>
                        {glass}
                      </option>
                    ))}
                  </select>

                  {/* MENSAJE Validacion*/}
                  {error.id === 8 && errorAlert}
                </div>

                {/* Measure */}
                <div className="mb-3">
                  <label
                    htmlFor="measure"
                    className="form-label fw-bold text-muted"
                  >
                    measure
                  </label>

                  <div className="row" id="measure">
                    <div className="col-6">
                      <select
                        className="form-select"
                        aria-label="Measure Quantity"
                        name="measureQuantity"
                        value={measureQuantity}
                        onChange={(e) => setMeasureQuantity(e.target.value)}
                      >
                        <option value={""}>Select measure quantity</option>
                        <option value={"1/2"}>1/2</option>
                        <option value={"1/3"}>1/3</option>
                        <option value={"1/4"}>1/4</option>

                        {measureQuantitys.map((number) => (
                          <option key={number} value={number}>
                            {number}
                          </option>
                        ))}
                      </select>
                      {/* MENSAJE Validacion*/}
                      {error.id === 4 && errorAlert}
                    </div>
                    <div className="col-6">
                      <select
                        className="form-select"
                        aria-label="Measure type"
                        name="measureType"
                        value={measureType}
                        onChange={(e) => setMeasureType(e.target.value)}
                      >
                        <option value={""}>Select measure type</option>
                        {cocktailMeasures.map((measure, index) => (
                          <option key={index} value={measure}>
                            {measure}
                          </option>
                        ))}
                      </select>

                      {/* MENSAJE Validacion*/}
                      {error.id === 5 && errorAlert}
                    </div>
                  </div>
                </div>

                {/* Ingredient */}
                <div className="mb-3">
                  <label
                    htmlFor="ingredient"
                    className="form-label fw-bold text-muted"
                  >
                    Ingredient
                  </label>

                  <div className="row" id="ingredient">
                    <div className="col-6">
                      <select
                        className="form-select"
                        aria-label="Measure type"
                        name="ingredient"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                      >
                        <option value={""}>Select ingredient</option>
                        {ingredientsList.map((ingredient, index) => (
                          <option key={index} value={ingredient}>
                            {ingredient}
                          </option>
                        ))}
                      </select>

                      {/* MENSAJE Validacion*/}
                      {error.id === 9 && errorAlert}
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-lg btn-light d-flex justify-content-center align-content-center"
                        onClick={
                          indexList !== null ? handleUpdateItem : handleAddItem
                        }
                      >
                        {indexList !== null ? <VscSaveAs /> : <BiPlusMedical />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* List measure */}
                <div className="mt3">
                  <ul className="list-group list-group-flush">
                    {meDrink.measures.map((measure, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action row"
                      >
                        <div className="row">
                          <div className="col-2">
                            <span className="small text-muted">
                              {index + 1}.
                            </span>
                          </div>
                          <div className="col-4">{measure}</div>
                          <div className="col-4">
                            {meDrink.ingredients[index]}
                          </div>
                          <div className="col-1 d-flex justify-content-center">
                            <AiFillEdit
                              className="ms-2"
                              onClick={() => hadleEditItem(index)}
                            />
                          </div>
                          <div className="col-1 d-flex justify-content-center">
                            <AiFillDelete
                              className="ms-2"
                              onClick={() => handleDeleteItem(index)}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dropzone - Preparation */}
              <div className="col-12 col-md-6">
                {/* Dropzone */}
                <div className="mt-4">
                  <label
                    htmlFor="dropzone"
                    className="form-label fw-bold text-muted"
                  >
                    Image:
                  </label>
                  <Dropzone
                    id="dropzone"
                    setMeDrink={setMeDrink}
                    meDrink={meDrink}
                  />
                  {/* imagen editar */}
                  {
                    !meDrink.image && (
                      <div className="d-flex justify-content-center">
                        <img
                          src={drink.ruta}
                          className="img-fluid rounded-1"
                          width={200}
                          height={200}
                          alt={drink.name}
                        />
                      </div>
                    )
                  }

                  {/* MENSAJE Validacion*/}
                  {error.id === 2 && errorAlert}
                </div>

                {/* Preparation */}
                <div className="mb-3">
                  <label
                    htmlFor="preparation"
                    className="form-label fw-bold text-muted"
                  >
                    Preparation
                  </label>
                  <textarea
                    className="form-control"
                    id="preparation"
                    rows="6"
                    name="preparation"
                    value={meDrink.preparation}
                    onChange={handleChange}
                    onInput={(e) => handleInput(e)}
                  ></textarea>
                  {error.id === 3 && errorAlert}
                </div>
              </div>
            </div>

            {/* button send */}
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="btn btn-lg btn-dark mt-5 w-25 my-4"
              >
                Save <BiSave className="ms-2" />
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default EditDrink;
