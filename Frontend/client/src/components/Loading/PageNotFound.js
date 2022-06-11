import { Button, Row, Col, Container, NavbarBrand } from "reactstrap";

import React from "react";
import { Link } from "react-router-dom";
const ooredoo = require("../../assets/img/oored.png");
import "./404.css";

const PageNotFound = () => {
  return (
    <Container className="py-lg-6 w-100vh h-100vh">
      <Row className="justify-content-center">
        <Col>
          <div className="text-center">
          <img alt="..." src={ooredoo} className='w-25 h-25'/>
            <a href="/home">
              <h2 className="my-4 text-red text-underline">
                Cliquez pour aller à la page d'accueil
              </h2>
            </a>

            <div className="circles text-center fluid">
              <p className="text-secondary">
                404
                <br />
                <small>PAGE NOT FOUND</small>
              </p>
              <span className="circle big"></span>
              <span className="circle med"></span>
              <span className="circle small"></span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
