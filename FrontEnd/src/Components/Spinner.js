import React,{useEffect, useState} from "react";

const Spinner = () => {

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const content = document.getElementById("spinner");

    if (header !== null && footer !== null && content !== null) {
      setHeight(
        window.innerHeight - (header.offsetHeight + footer.offsetHeight)
      );

      content.style.height = `${height}px`;
    }
  }, [height]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" id="spinner">
        <div className="text-center">
          <h3 className="fw-bold">Loading...</h3>
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1" />
            <div className="sk-cube sk-cube2" />
            <div className="sk-cube sk-cube3" />
            <div className="sk-cube sk-cube4" />
            <div className="sk-cube sk-cube5" />
            <div className="sk-cube sk-cube6" />
            <div className="sk-cube sk-cube7" />
            <div className="sk-cube sk-cube8" />
            <div className="sk-cube sk-cube9" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
