import React from "react";
import Layout from "../Components/Layout";
import AvatarMarilyn from "../Images/AvatarMarilyn.png";
import AvatarAxel from "../Images/AvatarAxel.png";
import AvatarWil from "../Images/Avatar.jpg";
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
  FaTools,
  FaUserGraduate,
  FaUserAstronaut,
  FaUserTie,
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

import { HiAcademicCap } from "react-icons/hi";
import { BsFillInfoSquareFill } from "react-icons/bs";


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

        {/* Contact section*/}

        <section className="my-5">
          <div className="container">
            <h2 className="my-3">Design &amp; Developed</h2>
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered justify-content-center">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-wilfredo"
                    >
                      <span className="h4 text-primary">
                        <FaUserTie /> Wilfredo
                      </span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link "
                      data-bs-toggle="tab"
                      data-bs-target="#profile-marilyn"
                    >
                      <span className="h4 text-danger">
                        <FaUserGraduate /> Marilyn
                      </span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link "
                      data-bs-toggle="tab"
                      data-bs-target="#profile-axel"
                    >
                      <span className="h4 text-success">
                        <FaUserAstronaut /> Axel
                      </span>
                    </button>
                  </li>
                </ul>

                <div className="tab-content pt-2">
                  {/* Wilfredo */}
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-wilfredo"
                  >
                    {/* About*/}
                    <div className="resume-section" id="about">
                      <div className="resume-section-content">
                        <h2 className="my-3 text-primary">
                          <BsFillInfoSquareFill /> About Me
                        </h2>
                        <div className="row align-items-center justify-content-center mb-2">
                          <div className="col-12 col-md-6">
                            <h4 className="mt-2">
                              {" "}
                              Heredia, Sarapiquí, Costa Rica
                            </h4>

                            <a
                              className="text-secondary h-4"
                              href="mailto:name@email.com"
                            >
                              wilfredo.barquero.herrera@gmail.com
                            </a>

                            <p className="lead my-5">
                            I am a self-taught student, I like to be constantly learning new web programming technologies. I have experience and I like to work collaboratively to enrich the projects in which I participate.
                            </p>
                          </div>

                          <div className="col-12 col-md-6 d-flex align-self-center">
                            <img
                              className="rounded-circle mx-auto mb-2"
                              src={AvatarWil}
                              alt="Avatar Wilfredo Barquero"
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
                    </div>
                    <hr className="m-0" />
                    {/* Education*/}
                    <div className="resume-section" id="education">
                      <div className="resume-section-content">
                        <h2 className="my-3 text-primary">
                          <HiAcademicCap /> Education
                        </h2>
                        <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                          <div className="flex-grow-1">
                            <h3 className="mb-0">
                              University National of Costa Rica
                            </h3>
                            <div className="subheading mb-3">
                             BACHELOR OF INFORMATION SYSTEMS ENGINEERING
                            </div>
                            <div>Currently studying the degree</div>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-secondary">
                              2018 - {year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="m-0" />
                    {/* Skills*/}
                    <div className="resume-section" id="skills">
                      <div className="resume-section-content">
                        <h2 className="my-3 text-primary">
                          <FaTools /> Skills
                        </h2>
                        <div className="subheading mb-3">
                          PROGRAMMING LANGUAGES & TOOLS
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
                    </div>
                  </div>

                  <div
                    className="tab-pane fade profile-edit"
                    id="profile-marilyn"
                  >
                    {/* Marilyn */}
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-wilfredo"
                    >
                      {/* About*/}
                      <div className="resume-section" id="about">
                        <div className="resume-section-content">
                          <h2 className="my-3 text-danger">
                            <BsFillInfoSquareFill /> About Me
                          </h2>
                          <div className="row align-items-center justify-content-center mb-2">
                            <div className="col-12 col-md-6">
                              <h4 className="mt-2">
                                {" "}
                                Heredia, Sarapiquí, Costa Rica
                              </h4>

                              <a
                                className="text-secondary h-4"
                                href="mailto:name@email.com"
                              >
                                marybel@gmail.com
                              </a>

                              <p className="lead my-5">
                              I am a self-taught student, I like to be constantly learning new web programming technologies. I have experience and I like to work collaboratively to enrich the projects in which I participate.
                              </p>
                            </div>

                            <div className="col-12 col-md-6 d-flex align-self-center">
                              <img
                                className="rounded-circle mx-auto mb-2"
                                src={AvatarMarilyn}
                                alt="Avatar MarilynElmer Mejías"
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
                      </div>
                      <hr className="m-0" />
                      {/* Education*/}
                      <div className="resume-section" id="education">
                        <div className="resume-section-content">
                          <h2 className="my-3 text-danger">
                            <HiAcademicCap /> Education
                          </h2>
                          <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                            <div className="flex-grow-1">
                              <h3 className="mb-0">
                                University National of Costa Rica
                              </h3>
                              <div className="subheading mb-3">
                                BACHELOR OF INFORMATION SYSTEMS ENGINEERING
                              </div>
                              <div>Currently studying the degree</div>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="text-secondary">
                                2018 - {year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="m-0" />
                      {/* Skills*/}
                      <div className="resume-section" id="skills">
                        <div className="resume-section-content">
                          <h2 className="my-3 text-danger">
                            <FaTools /> Skills
                          </h2>
                          <div className="subheading mb-3">
                            PROGRAMMING LANGUAGES & TOOLS
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
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade profile-edit"
                    id="profile-axel"
                  >
                    {/* Marilyn */}
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-marilyn"
                    >
                      {/* About*/}
                      <div className="resume-section" id="about">
                        <div className="resume-section-content">
                          <h2 className="my-3 text-success">
                            <BsFillInfoSquareFill /> About Me
                          </h2>
                          <div className="row align-items-center justify-content-center mb-2">
                            <div className="col-12 col-md-6">
                              <h4 className="mt-2">
                                {" "}
                                Heredia, Sarapiquí, Costa Rica
                              </h4>

                              <a
                                className="text-secondary h-4"
                                href="mailto:name@email.com"
                              >
                                axel@gmail.com
                              </a>

                              <p className="lead my-5">
                              I am a self-taught student, I like to be constantly learning new web programming technologies. I have experience and I like to work collaboratively to enrich the projects in which I participate.
                              </p>
                            </div>

                            <div className="col-12 col-md-6 d-flex align-self-center">
                              <img
                                className="rounded-circle mx-auto mb-2"
                                src={AvatarAxel}
                                alt="Avatar Axel"
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
                      </div>
                      <hr className="m-0" />
                      {/* Education*/}
                      <div className="resume-section" id="education">
                        <div className="resume-section-content">
                          <h2 className="my-3 text-success">
                            <HiAcademicCap /> Education
                          </h2>
                          <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                            <div className="flex-grow-1">
                              <h3 className="mb-0">
                                University National of Costa Rica
                              </h3>
                              <div className="subheading mb-3">
                                BACHELOR OF INFORMATION SYSTEMS ENGINEERING
                              </div>
                              <div>Currently studying the degree</div>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="text-secondary">
                                2018 - {year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="m-0" />
                      {/* Skills*/}
                      <div className="resume-section" id="skills">
                        <div className="resume-section-content">
                          <h2 className="my-3 text-success">
                            <FaTools /> Skills
                          </h2>
                          <div className="subheading mb-3">
                            PROGRAMMING LANGUAGES & TOOLS
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
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Bordered Tabs */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contant;
