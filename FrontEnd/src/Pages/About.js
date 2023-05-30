import React from "react";
import Layout from "../Components/Layout";
import Logo from "../Images/logo-1.png";

const About = () => {
  return (
    <>
      <Layout>
        {/* Masthead*/}
        <header className="masthead bg-danger" id="about">
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center text-white">
                  {/* Page heading*/}
                  <img
                    src={Logo}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="d-inline-block img-fluid align-text-top mx-3 rounded-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div>
          {/* Course section*/}
          <section className="bg-light mt-5">
            <div className="container px-4">
              <div className="row gx-4 justify-content-center">
                <div className="col-lg-8">
                  <h2>Web Programming Fundamentals</h2>
                  <p className="lead">
                    This course seeks to develop basic knowledge of Web
                    technologies to offer quality and sustainable solutions
                    based on the use of free, proprietary and open tools.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Proyect section*/}
          <section>
            <div className="container px-4 mb-5">
              <div className="row gx-4 justify-content-center">
                <div className="col-lg-8">
                  <h2>Project 1</h2>
                  <p className="lead">
                    Each student individually must create a web page where they
                    test the knowledge acquired in the lessons prior to
                    assigning the project.
                  </p>
                  <ul>
                    <li>Choose an api and consume its data</li>
                    <li>Apply html layoute</li>
                    <li>Apply css styles to html elements</li>
                    <li>
                      Add interaction to web page using JavaScript and
                      manipulate document elements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default About;
