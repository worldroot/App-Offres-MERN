import {
  Row,
  Col,
  Container,
  UncontrolledCarousel,
  Button,
  Card,
  CardBody,
} from "reactstrap";

import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import "../components/Loading/loading.css";
import { refreshJwt } from "redux/auth/authActions";
import { allPub } from "redux/offres/offreActions";
import decode from "jwt-decode";

const bg1 = require("../assets/img/bg-offres-01.png");
const bg2 = require("../assets/img/bg-offres-04.png");
const bg3 = require("../assets/img/bg-offres-05.png");

const add = require("../assets/img/undraw_Add_files_re_v09g.png");
const select = require("../assets/img/undraw_Selecting_re_5ff6.png");
const final = require("../assets/img/undraw_Agreement_re_d4dv.png");
const dep = require("../assets/img/undraw_Folder_files_re_2cbm.png");

import { Carousel } from "react-responsive-carousel";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.AllPub();
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = decode(accessToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(refreshJwt({ refreshToken }));
      }
    }
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      return <Redirect to="/login" />;
    }
  }, []);

  const items = [
    { src: bg1, caption: "" },
    { src: bg2, caption: "" },
    { src: bg3, caption: "" },
  ];

  const img = {
    height: 200,
    width: 220,
  };

  return (
    <>
      <div className="main-content">
        <AuthNavbar />

        <Container className="justify-content-center bg-white text-center w-75">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Carousel
              autoPlay={true}
              showThumbs={false}
              showIndicators={true}
              showStatus={false}
              showArrows={false}
              infiniteLoop={true}
            >
              <div>
                <img src={bg1} />
              </div>
              <div>
                <img src={bg2} />
              </div>
              <div>
                <img src={bg3} />
              </div>
            </Carousel>
          </motion.div>
        </Container>
        <Container className="mb-6 mt-4">
          <h1 className="text-red text-center m-4 border-bottom border-danger">
            LES APPELS D'OFFRES
          </h1>
          {props.isLoading ? (
            <div className="text-center mt-4 mb-4 py-4 p-xl-9">
              <div id="loading"></div>
            </div>
          ) : (
            <>
              <Row xs={1} md={3} className="g-4">
                {props.Listpub.slice(0, 3).map((of, index) => {
                  return (
                    <Fragment key={index}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                      >
                        <Col>
                          <Card className="m-2 cardStyle">
                            <CardBody className="text-dark">
                              <div className="text-center">
                                <img
                                  className="img-fluid rounded avatar avatar-lg m-2"
                                  style={img}
                                  src={of.image[0]}
                                  alt=""
                                />
                              </div>
                              <Row>
                                <h3>{of.titre.substring(0, 25)}</h3>
                              </Row>
                              <Row>
                                <small>
                                  Categorie: {of.category} - {of.souscategory}
                                </small>
                              </Row>

                              <Row>
                                <small className="text-danger">
                                  Date Debut: {of.dateDebut.substring(0, 10)}
                                </small>
                              </Row>
                              <Row>
                                <small className="text-danger">
                                  Date Limite: {of.dateFin.substring(0, 10)}
                                </small>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </motion.div>
                    </Fragment>
                  );
                })}
              </Row>
              <Row className="justify-content-center">
                <Button
                  className="my-4 btn-outline-danger"
                  onClick={() => history.push("/published-offres")}
                  type="submit"
                >
                  Afficher la suite
                </Button>
              </Row>
            </>
          )}
        </Container>
        <Container className="mt-4">
          <h1 className="text-red text-center m-4 border-bottom border-danger">
            SOLUTION
          </h1>
          <motion.div
            initial={{ x: "400vh" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Row className="m-2">
              <Col>
                <h1 className="text-dark">Publication des appels d'offres</h1>
                <h2 className="text-gray">
                  Chaque offre publiée contient tous les détails nécessaires
                  (Prix, date de début et de fin, description...).
                </h2>
                <Button
                  className="my-4 btn-outline-dark"
                  onClick={() => history.push("/published-offres")}
                  type="submit"
                >
                  Les appels doffres publiés
                </Button>
              </Col>
              <Col>
                <img className="w-100 h-100" src={add} alt="" />
              </Col>
            </Row>
          </motion.div>

          <motion.div
            initial={{ x: "-400vh" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Row className="m-2">
              <Col>
                <img className="w-100 h-100" src={select} alt="" />
              </Col>
              <Col>
                <h1 className="text-dark">Soumettre une demande</h1>
                <h2 className="text-gray">
                  Après avoir vérifier votre compte vous pouvez soumettre une
                  demande de l'offre choisis en ajoutant un prix.
                </h2>
              </Col>
            </Row>
          </motion.div>

          <motion.div
            initial={{ x: "-400vh" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Row className="m-2">
              <Col>
                <h1 className="text-dark">Dépouillement</h1>
                <h2 className="text-gray">
                  Après la fin de l'offre, le dépouillement des soumissions
                  commence pour avoir le meilleur prix propose.
                </h2>
              </Col>
              <Col>
                <img className="w-100 h-100" src={dep} alt="" />
              </Col>
            </Row>
          </motion.div>

          <motion.div
            initial={{ x: "400vh" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Row className="m-2">
              <Col>
                <img className="w-100 h-100" src={final} alt="" />
              </Col>
              <Col>
                <h1 className="text-dark">Résultats</h1>
                <h2 className="text-gray">
                  Si votre soumission a eu le meilleur prix proposé vous serez
                  contacté par l'un des agents d'Ooredoo.
                </h2>
              </Col>
            </Row>
          </motion.div>
        </Container>

        <AuthFooter />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  Listpub: state.offres.offres,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.offres.loading,
});

const mapActionToProps = {
  AllPub: allPub,
};

export default connect(mapStateToProps, mapActionToProps)(Home);
