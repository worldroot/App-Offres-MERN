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
          <h1 className="mb-0">Instructions</h1>
        </CardHeader>

        <CardBody>
          <Row>
            <Row className=" m-2">
              <span className=" text-success text-underline">Published </span>
              <span className=" text-dark">
                : {DatetoCheck.toISOString().substring(0, 10)} est entre date
                debut et date fin
              </span>
            </Row>
            <Row className=" m-2">
              <span className=" text-warning text-underline">Pending </span>
              <span className=" text-dark">
                : {DatetoCheck.toISOString().substring(0, 10)} est avant date
                debut
              </span>
            </Row>
            <Row className=" m-2">
              <span className=" text-grey text-underline ">Archived </span>
              <span className=" text-dark">
                : Offre archivee de la part super-admin
              </span>
            </Row>
            <Row className=" m-2">
              <span className=" text-dark text-underline">Closed </span>
              <span className=" text-dark">
                : {DatetoCheck.toISOString().substring(0, 10)} est apres date
                fin
              </span>
            </Row>
            <Row className=" m-2">
            <span className=" text-red text-underline">Conditions :</span>
              <span className=" text-danger">
                Impossible de modifier, Si le nombre de soumissions de l'offre choisie avec un status 'Archived' est supérieur à zéro
              </span>
            </Row>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default Infos;
