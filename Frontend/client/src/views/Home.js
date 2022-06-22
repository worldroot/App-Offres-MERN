import { Row, Col, Container, UncontrolledCarousel, Button } from "reactstrap";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import { Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

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

const Home = ({...props}) => {

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


  const items = [{ src: bg1, caption: '' }, { src: bg2, caption: ''  }, { src: bg3, caption: ''  }];
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
            <UncontrolledCarousel items={items} />
          </motion.div>
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

          <h1 className="text-red text-center m-4 border-bottom border-danger">
            LES APPELS D'OFFRES
          </h1>
          
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
  AllPub: allPub
};

export default connect(mapStateToProps, mapActionToProps)(Home);
