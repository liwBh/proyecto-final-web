import React from "react";
import Layout from "../Components/Layout";
import Logo from "../Images/logo-1.png";
import about1 from "../Images/about-1.jpg";
import about2 from "../Images/about-2.jpg";
import about3 from "../Images/about-3.jpg";
import about4 from "../Images/about-4.jpg";
import { Carousel } from "react-responsive-carousel";

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

        {/* About our web application*/}
        <section className="bg-light mt-5">
          <div className="container px-4">
            <div className="row gx-4 justify-content-center">
              <div className="col-lg-8">
                <h2>About our web application</h2>
                <p className="lead text-muted mt-3">
                  Welcome to our cocktails and drinks web app, where you can
                  discover a wide variety of delicious recipes and share your
                  own creations with other drink lovers. Our platform is
                  designed to offer you a unique experience and give you
                  inspiration to create new drinks for yourself or your friends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* carousel */}
        <section className="container w-50">
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            showStatus={false}
            interval={5000}
            transitionTime={1000}
          >
            <div>
              <img src={about1} alt="about 4" />
            </div>
            <div>
              <img src={about2} alt="about 4" />
            </div>
            <div>
              <img src={about3} alt="about 4" />
            </div>
            <div>
              <img src={about4} alt="about 4" />
            </div>
          </Carousel>
        </section>

        {/* Proyect section*/}
        <section>
          <div className="container px-4 mb-5">
            <div className="row gx-4 justify-content-center">
              <div className="col-lg-8">
                <h2 className="my-3">What we offer?</h2>

                <ul>
                  <li>
                    <h4 className="">Extensive Cocktail Collection:</h4>
                    <p className="lead text-muted">
                      Explore our extensive catalog of cocktails and beverages,
                      from the most popular classics to innovative creations.
                      Find the perfect drink for every occasion.
                    </p>
                  </li>
                  <li>
                    <h4 className="">Detailed recipes:</h4>
                    <p className="lead text-muted">
                      Access detailed and easy-to-follow recipes that will guide
                      you step by step in the preparation of the cocktails.
                      Learn mixing techniques, key ingredients and presentation.
                    </p>
                  </li>
                  <li>
                    <h4 className="">User Community:</h4>
                    <p className="lead text-muted">
                      Join a vibrant community of cocktail lovers. Register on
                      our platform and share your own recipes and
                      recommendations with other users. Get inspired by the
                      community's creations and discover new combinations.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our objetive */}
        <section>
          <div className="container px-4 mb-5">
            <div className="row gx-4 justify-content-center">
              <div className="col-lg-8">
                <h2 className="my-3">Our objetive</h2>

                <ul>
                  <li>
                    <h4 className="">Inspire Creativity:</h4>
                    <p className="lead text-muted">
                      We want to encourage creativity in beverage creation,
                      giving you a space to experiment with ingredients and
                      techniques, and discover surprising new flavors and
                      combinations.
                    </p>
                  </li>
                  <li>
                    <h4 className="">Connect the community:</h4>
                    <p className="lead text-muted">
                      Our platform is designed to connect people who are
                      passionate about beverages. We want you to share your
                      knowledge, be inspired by other users and make connections
                      with like-minded people.
                    </p>
                  </li>
                  <li>
                    <h4 className="">Easy Access:</h4>
                    <p className="lead text-muted">
                      We strive to make cocktail making accessible to everyone.
                      Our recipes are designed to suit different levels of
                      experience, from beginner to expert.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
