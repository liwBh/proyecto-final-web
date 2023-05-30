import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import fondo from "../Images/fondo-3.png";

const NotFoundPage = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const content = document.getElementById("content");

    if (header !== null && footer !== null && content !== null) {
      setHeight(
        window.innerHeight - (header.offsetHeight + footer.offsetHeight)
      );

      if (content.offsetHeight < height) {
        //console.log("Contenido menor a espacio disponible");

        content.style.height = `${height}px`;
      } else {
        content.style.height = `${content.offsetHeight}px`;
        //console.log("Contenido mayor a espacio disponible");
      }
    }
  }, [height]);

  return (
    <>
      <Layout>
        <div className="container-fluid d-flex align-items-center justify-content-around">
          <div className="row" id="content">
            <div className="col-12 col-md-6 align-self-center text-center ">
              <img
                src={fondo}
                alt="Error 404"
                width={600}
                height={400}
                className="d-inline-block align-text-top mx-3 rounded-1 img-fluid"
              />
            </div>

            <div className="col-12 col-md-6 align-self-center text-center bg-light p-5 shadow-1 rounded-3 mb-md-0 mb-5">
              <h1 className="fw-bold mb-3 px-2">Sorry page not found</h1>
              <p className="lead mb-4">
                The page you requested could not be found
              </p>
              <Link to="/" className="btn btn-dark">
                Go To <i className="bi bi-house"></i>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;
