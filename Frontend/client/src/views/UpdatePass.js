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

import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import useForm from "../helpers/useForm";
import { updatePassword } from "redux/users/userActions";
const initialFieldValues = {};

const UpdatePass = ({ ...props }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [password, setP] = useState("");
  const [confirmpass, setCp] = useState("");
  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);

  const onSubmit = (e) => {
    e.preventDefault();    
    dispatch(updatePassword(password, confirmpass));
  };

  const reset = (e) => {
    resetForm();
  };

  return (
    <>
      <hr className="my-4" />

      <FormGroup>
        <Row className="align-items-center">
          <Col xs="8">
            <h6 className="heading-small text-muted mb-4">
              Mettre à jour le mot de passe
            </h6>
          </Col>
        </Row>

        <Form onSubmit={onSubmit}>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label text-dark">
                  Nouveau mot de passe
                </label>
                <Input
                  value={password}
                  name="password"
                  onChange={(e) => setP(e.target.value)}
                  className="form-control-alternative"
                  type="password"
                />
              </FormGroup>
              <Button
              className="btn-outline-success"
              color="default"
              type="submit"
              size="sm"
            >
              Confirmer
            </Button>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label text-dark">
                  Confirmation mot de passe
                </label>
                <Input
                  value={confirmpass}
                  name="confirmpass"
                  onChange={(e) => setCp(e.target.value)}
                  className="form-control-alternative"
                  type="password"
                />
              </FormGroup>
             
            </Col>
          </Row>
          <Row>
           
          </Row>
        </Form>
      </FormGroup>
    </>
  );
};

export default UpdatePass;
