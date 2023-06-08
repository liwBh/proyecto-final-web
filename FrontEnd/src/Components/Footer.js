import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-dark text-white" id="footer">
      <div className="container p-2 text-center">
        <div className="d-flex align-items-center justify-content-center">
          <div className="">
            <h6 className="align-items-center">
              Design And Developed By: G1 Team Programación Web
            </h6>

            <p className="small m-0">
              All Right Reserved by &copy; <strong>G1 Team Programación Web</strong>~ {year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
