import { Row, Col, Container } from "reactstrap";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { allOffres } from "redux/offres/offreActions";
import { connect } from "react-redux";

const Offres = ({...props}) => {

    useEffect(() => {
        props.All();
      }, []);

  

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className=" py-xl-9">
         

          {/* Content */}
          <Container className="mt--8  py-xl-7">
            <Row className="justify-content-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <h1 className="text-center text-red">Liste des appels d'offres</h1>
              </motion.div>
            </Row>
          </Container>
        </div>
        <div className="fixed-bottom">
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    List: state.offres.offres,
    isAuth: state.auth.isAuthenticated,
  });
  
  const mapActionToProps = {
    All: allOffres,
  };
  
  export default connect(mapStateToProps, mapActionToProps)(Offres);
