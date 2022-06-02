// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
// core components

import React, { Fragment, useState, useEffect } from "react";
import "./offre.css";

const Infos = ({ ...props }) => {
  var date = new Date();
  const DatetoCheck = new Date(date.getTime());

  return (
    <>
      <Card>
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0">
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => props.setShowModal4(false)}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Instructions de status d'offres</h3>
          <h4>{DatetoCheck.toISOString().substring(0, 10)}</h4>
        </CardHeader>

        <CardBody>
          <Row>
            <Row className=" m-2">
              <span className=" text-success">Published </span>
              <span className=" text-dark">
                : {DatetoCheck.toISOString().substring(0, 10)} est entre date
                debut et date fin
              </span>
            </Row>
            <Row className=" m-2">
              <span className=" text-warning">Pending </span>
              <span className=" text-dark">
                : {DatetoCheck.toISOString().substring(0, 10)} est avant date
                debut
              </span>
            </Row>
            <Row className=" m-2">
              <span className=" text-grey">Archived </span>
              <span className=" text-dark">
                : Offre archivee de la par de super-admin
              </span>
            </Row>
            <Row className=" m-2">
              <span className=" text-dark">Closed </span>
              <span className=" text-dark">
                : {DatetoCheck.toISOString().substring(0, 10)} est apres date
                fin
              </span>
            </Row>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default Infos;
