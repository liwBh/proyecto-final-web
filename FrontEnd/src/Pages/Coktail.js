import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Dropzone from "../Components/Cocktail/Dropzone";
import { FaCocktail } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import {
  cocktailMeasures,
  categories,
  contentAlcoholic,
  glassName,
  ingredientsList,
} from "../Assets/DataPages";
import { regexMesure } from "../Assets/ExpresionRegular";

import { CgDanger } from "react-icons/cg";
import { BiSave } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";

const Cocktail = () => {
  const [meCocktail, setMeCocktail] = useState({
    name: "",
    preparation: "",
    measures: [],
    ingredients: [],
    image: null,
    category: "",
    alcoholic: "",
    glass: "",
  });

  const [measureQuantity, setMeasureQuantity] = useState("");
  const [measureType, setMeasureType] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [indexList, setIndexList] = useState(null);
  const [error, setError] = useState({
    id: 0,
    status: false,
    message: "",
  });

  /* const [error, setError] = useState(0); */

  useEffect(() => {
    /* console.log(meCocktail); */
  }, [meCocktail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (meCocktail.name.trim() === "") {
      showErroAlert("The name is required", 1);
      return;
    }

    if (meCocktail.image === null) {
      showErroAlert("The image is required", 2);
      return;
    }

    if (meCocktail.preparation.trim() === "") {
      showErroAlert("The preparation is required", 3);
      return;
    }

    if (meCocktail.measures.length === 0) {
      showErroAlert("The measures is required", 4);
      return;
    }

    if (meCocktail.ingredients.length === 0) {
      showErroAlert("The ingredients is required", 1);
      return;
    }
  };

  const handleChange = (e) => {
    setMeCocktail({
      ...meCocktail,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMeasure = (e) => {
    //se valida que los campos no esten vacios

    //validacion de cantidad de medida
    if (
      measureQuantity.trim() === "" &&
      measureType.trim() !== "To your liking"
    ) {
      showErroAlert("The measure quantity is required", 4);
      return;
    }
    //validacion de cantidad de medida
    if (
      (measureQuantity.trim() <= 0 || measureQuantity > 100) &&
      measureType.trim() !== "To your liking"
    ) {
      showErroAlert("must be greater than 0 and less than 100", 4);
      return;
    }

    //validacion de cantidad de tipo
    if (measureType.trim() === "") {
      showErroAlert("The measure type is required", 5);

      return;
    }

    //validacion de medidas maximo 14
    if (meCocktail.measures.length === 14) {
      showErroAlert("The measure maximum is 14", 5);
      return;
    }

    //se agrega la medida al array de medidas
    setMeCocktail({
      ...meCocktail,
      measures: [...meCocktail.measures, `${measureQuantity} ${measureType}`],
    });

    //se limpian los campos
    setMeasureQuantity("");
    setMeasureType("");
  };

  const showErroAlert = (message, id) => {
    console.log("entro");
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

  const handleDeleteMeasure = (index) => {
    const newMeasures = meCocktail.measures.filter((measure, i) => i !== index);
    setMeCocktail({ ...meCocktail, measures: newMeasures });
  };

  const hadleEditMeasure = (index) => {
    const text1 = meCocktail.measures[index].split(" ")[0];
    const text2 = meCocktail.measures[index].substring(`${text1}`.length + 1);
    setMeasureQuantity(text1);
    setMeasureType(text2);

    setIndexList(index);
  };

  const handleUpdateMeasure = () => {
    const newMeasures = meCocktail.measures;
    newMeasures[indexList] = `${measureQuantity} ${measureType}`;
    setMeCocktail({ ...meCocktail, measures: newMeasures });

    //reseteo de campos
    setIndexList(null);
    setMeasureQuantity("");
    setMeasureType("");
  };

  const errorAlert = (
    <div className="text-danger my-2">
      {error.message} <CgDanger className="text-danger" />
    </div>
  );

  return (
    <>
      <Layout>
        <div className="mt-5">
          {/* Formulario */}
          <h2 className="d-flex justify-content-start align-items-center mb-5">
            New Cocktail <FaCocktail className="ms-2 text-dark" />
          </h2>

          <form onSubmit={handleSubmit} className="form-control mb-5">
            <div className="row">
              {/* input - select */}
              <div className="col-12 col-md-6">
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
                    value={meCocktail.name}
                    onChange={handleChange}
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
                    value={meCocktail.alcoholic}
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
                  {error.id === 7 && errorAlert}
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
                    value={meCocktail.category}
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
                  {error.id === 8 && errorAlert}
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
                    value={meCocktail.glass}
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
                    <div className="col-5">
                      <input
                        type="number"
                        className="form-control"
                        name="measureQuantity"
                        value={measureQuantity}
                        onChange={(e) => setMeasureQuantity(e.target.value)}
                      />
                      {/* MENSAJE Validacion*/}
                      {error.id === 4 && errorAlert}
                    </div>
                    <div className="col-5">
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
                    <div className="col-2">
                      <button
                        type="button"
                        className="btn btn-lg btn-light d-flex justify-content-center align-content-center"
                        onClick={
                          indexList !== null
                            ? handleUpdateMeasure
                            : handleAddMeasure
                        }
                      >
                        {indexList !== null ? <VscSaveAs /> : <BiPlusMedical />}
                      </button>
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
                        <option value={""}>Select </option>
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
                          indexList !== null
                            ? handleUpdateMeasure
                            : handleAddMeasure
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
                    {meCocktail.measures.map((measure, index) => (
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
                          <div className="col-6 ">{measure}</div>
                          <div className="col-2 d-flex justify-content-center">
                            <AiFillEdit
                              className="ms-2"
                              onClick={() => hadleEditMeasure(index)}
                            />
                          </div>
                          <div className="col-2 d-flex justify-content-center">
                            <AiFillDelete
                              className="ms-2"
                              onClick={() => handleDeleteMeasure(index)}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* MENSAJE Validacion*/}
                  {error.id === 6 && errorAlert}
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
                    setMeCocktail={setMeCocktail}
                    meCocktail={meCocktail}
                  />
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
                    value={meCocktail.preparation}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

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

export default Cocktail;
