import React from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

const CardCocktail = ({ cocktail }) => {
  //abreviar el nombre de la bebida
  let shortTitle = cocktail.name;
  if (cocktail.name.length > 18) {
    shortTitle = cocktail.name.slice(0, 18).concat("...");
  }

  const marginRight = cocktail.likes.length > 10 && cocktail.likes.length < 100 ? "-6px" : cocktail.likes.length > 100 ? "-10px" : "0px";

  console.log(cocktail);

  return (
    <>
      <div className="card shadow-1">
        <img
          src={cocktail.image}
          className="card-img-top"
          alt={`Cocktail ${cocktail.name}`}
        />
        <div className="card-body ">
          <div className="d-flex align-items-center justify-content-center">
            <MdDriveFileRenameOutline className="me-2" />

            <h5
              className="card-title"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={cocktail.name}
            >
              {shortTitle}
            </h5>
          </div>
          <div className="mt-2 d-flex justify-content-around align-items-center">
            <div className="likes-icon">
              <AiFillLike className="text-secondary" style={{ fontSize: "1.5rem" }} />
              <span className="likes-count text-muted" style={{marginRight: marginRight }}>{cocktail.likes.length}</span>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-around align-items-center">

            <Link
              to={`/drik-detail/${cocktail.id}`}
              className="btn btn-dark align-self-center"
            >
              <FaRegEye /> Drink
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCocktail;
