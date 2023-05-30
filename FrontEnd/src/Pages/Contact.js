import React from "react";
import Layout from "../Components/Layout";
import Avatar from "../Images/Avatar.jpg";
import Logo from "../Images/logo-1.png";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaGithub,
  FaSass,
  FaPhp,
  FaLaravel,
  FaLinux,
  FaGitlab,
  FaMarkdown,
  FaJava,
  FaAndroid,
} from "react-icons/fa";
import {
  SiRedux,
  SiJavascript,
  SiPostgresql,
  SiTailwindcss,
  SiSqlite,
  SiMongodb,
  SiIonic,
  SiMysql,
  SiFirebase,
  SiCanva,
} from "react-icons/si";

const Contant = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <Layout>
        {/* Masthead*/}
        <header className="masthead bg-danger" id="contact">
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

        {/* Page Content*/}
        <div className="container-fluid p-0 mt-3">
          {/* About*/}
          <section className="resume-section" id="about">
            <div className="resume-section-content">
              <div className="row align-items-center justify-content-center mb-2">
                <div className="col-12 col-md-6">
                  <h3 className="mb-0">
                    Wilfredo
                    <span className="text-danger"> Barquero Herrera</span>
                  </h3>

                  <h4 className="mt-2"> Heredia, Sarapiquí, Costa Rica</h4>

                  <a className="text-seconday h-4" href="mailto:name@email.com">
                    wilfredo.barquero.herrera@gmail.com
                  </a>

                  <p className="lead my-5">
                    I am a self-taught student, I like to be constantly learning
                    new web programming technologies. I have experience and I
                    like to work collaboratively to enrich the projects in which
                    I participate.
                  </p>
                </div>

                <div className="col-12 col-md-6 d-flex align-self-center">
                  <img
                    className="rounded-circle mx-auto mb-2"
                    src={Avatar}
                    alt="Avatar LiwBH"
                    width={180}
                    height={180}
                  />
                </div>
              </div>

              <div className="social-icons">
                <a className="social-icon" href="#!">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="social-icon" href="#!">
                  <i className="fab fa-github" />
                </a>
                <a className="social-icon" href="#!">
                  <i className="fab fa-twitter" />
                </a>
                <a className="social-icon" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </div>
            </div>
          </section>
          <hr className="m-0" />
          {/* Education*/}
          <section className="resume-section" id="education">
            <div className="resume-section-content">
              <h2 className="mb-5">Education</h2>
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">University National of Costa Rica</h3>
                  <div className="subheading mb-3">
                    Bachelor of Information Systems Engineering
                  </div>
                  <div>Currently studying the degree</div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-secondary">2018 - {year}</span>
                </div>
              </div>
            </div>
          </section>
          <hr className="m-0" />
          {/* Skills*/}
          <section className="resume-section" id="skills">
            <div className="resume-section-content">
              <h2 className="mb-5">Skills</h2>
              <div className="subheading mb-3">
                Programming Languages &amp; Tools
              </div>
              <ul className="list-inline dev-icons">
                <li className="list-inline-item">
                  <FaHtml5 />
                </li>
                <li className="list-inline-item">
                  <FaCss3Alt />
                </li>
                <li className="list-inline-item">
                  <SiJavascript />
                </li>
                <li className="list-inline-item">
                  <FaBootstrap />
                </li>
                <li className="list-inline-item">
                  <FaSass />
                </li>
                <li className="list-inline-item">
                  <SiCanva />
                </li>
                <li className="list-inline-item">
                  <FaReact />
                </li>
                <li className="list-inline-item">
                  <SiRedux />
                </li>
                <li className="list-inline-item">
                  <FaNodeJs />
                </li>
                <li className="list-inline-item">
                  <FaPhp />
                </li>
                <li className="list-inline-item">
                  <FaJava />
                </li>
                <li className="list-inline-item">
                  <FaAndroid />
                </li>
                <li className="list-inline-item">
                  <SiIonic />
                </li>
                <li className="list-inline-item">
                  <SiMysql />
                </li>
                <li className="list-inline-item">
                  <SiPostgresql />
                </li>

                <li className="list-inline-item">
                  <SiSqlite />
                </li>
                <li className="list-inline-item">
                  <SiFirebase />
                </li>
                <li className="list-inline-item">
                  <SiMongodb />
                </li>
                <li className="list-inline-item">
                  <FaLaravel />
                </li>
                <li className="list-inline-item">
                  <SiTailwindcss />
                </li>
                <li className="list-inline-item">
                  <FaMarkdown />
                </li>
                <li className="list-inline-item">
                  <FaGithub />
                </li>
                <li className="list-inline-item">
                  <FaGitlab />
                </li>
                <li className="list-inline-item">
                  <FaLinux />
                </li>
              </ul>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Contant;
