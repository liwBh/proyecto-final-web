import React from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const CardDrink = ({ cocktail }) => {

    //abreviar el nombre de la bebida
    let shortTitle = cocktail.name;
    if(cocktail.name.length > 18){
      shortTitle = cocktail.name.slice(0,18).concat("...");
    }

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

            <h5 className="card-title" data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title={cocktail.name}>{shortTitle}</h5>
          </div>

          <div className="mt-3 d-flex align-items-center justify-content-center">
            <Link
              to={`/driks/${cocktail.id}`}
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

export default CardDrink;
