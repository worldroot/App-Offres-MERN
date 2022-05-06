import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

const DemandesByUser = ({ ...props }) => {

  const user = useSelector((state) => state.auth.user);

  const reset = (e) => {
    resetForm();
  };

  return (
    <>
      <Card className="bg-secondary shadow fixed-top">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0 text-red">Vos demandes</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="btn btn-outline-dark"
                onClick={() => props.setShow(false)}
                size="sm"
              >
                Annuler
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
        </CardBody>
      </Card>
    </>
  );
};

export default DemandesByUser;
