import React from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { usePrivateRoute } from "../../Hooks/usePrivateRoute";
import { setCurrentDrink} from "../../Redux/Drinks/DrinkSlice";
import { useDispatch } from "react-redux";

const CardDrink = ({ drink }) => {
  usePrivateRoute();
  const dispatch = useDispatch();

  //abreviar el nombre de la bebida
  let shortTitle = drink.name;
  if (drink.name.length > 18) {
    shortTitle = drink.name.slice(0, 18).concat("...");
  }

  const marginRight =
    drink.likes.length > 10 && drink.likes.length < 100
      ? "-6px"
      : drink.likes.length > 100
      ? "-10px"
      : "0px";

  const handleCurrentDrink = () => {
    dispatch( setCurrentDrink({ data: drink }) );
  };

  return (
    <>
      <div className="card shadow-1">
        <img
          src={drink.ruta}
          className="card-img-top"
          alt={`drink ${drink.name}`}
          height={300}
        />
        <div className="card-body ">
          <div className="d-flex align-items-center justify-content-center">
            <MdDriveFileRenameOutline className="me-2" />

            <h5
              className="card-title"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={drink.name}
            >
              {shortTitle}
            </h5>
          </div>
          <div className="mt-2 d-flex justify-content-around align-items-center">
            <div className="likes-icon">
              <AiFillLike
                className="text-secondary"
                style={{ fontSize: "1.5rem" }}
              />
              <span
                className="likes-count text-muted"
                style={{ marginRight: marginRight }}
              >
                {drink.likes.length}
              </span>
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-around align-items-center">
            <Link
              to={`/details-drink/${drink.id}`}
              className="btn btn-dark align-self-center"
              onClick={() => handleCurrentDrink()}
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
