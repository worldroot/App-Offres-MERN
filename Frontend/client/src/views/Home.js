import { Row, Col, Container, UncontrolledCarousel } from "reactstrap";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { refreshJwt } from "redux/auth/authActions";
import decode from "jwt-decode";
const ooredoo = require("../assets/img/oored.png");

const Home = () => {
  const userExist = localStorage.getItem("user");
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const dispatch = useDispatch();
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
    {
      src: ooredoo,

    },
    {
      src: ooredoo,

    },

  ];

  return (
    <>
      <div className="main-content">
        <AuthNavbar />

        {/* Content */}
        {!userExist && (
          <>
            <Container className="mt-4 mb-4 py-4">
              <Row className="justify-content-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <h1 className="text-center text-red">Acceuil</h1>
                </motion.div>
              </Row>
            </Container>
          </>
        )}

        {userExist && (
          <>
            <Container className="mt-4 mb-4 py-4">
              <Row className="justify-content-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <h1 className="text-center text-red">Bienvenue</h1>
                </motion.div>
              </Row>
            </Container>
            {/* <UncontrolledCarousel items={items} /> */}
          </>
        )}

        <AuthFooter />
      </div>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapToStateProps)(Home);
