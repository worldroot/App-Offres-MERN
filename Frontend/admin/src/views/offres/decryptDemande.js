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
  Table,
} from "reactstrap";
// core components
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import { decryptDemande } from "redux/offres/offreActions";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "components/modal.css";
import "./offre.css";
const initialFieldValues = { key: "" };

const DecryptDemande = ({ ...props }) => {
  const dm = props.currentObj;
  const dispatch = useDispatch();
  const [data, setData] = useState(initialFieldValues);
  const { key } = data;
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(decryptDemande(props.currentObj._id, data));
    props.setShowModal(false);
  };

  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center border-0">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0 text-dark">Décryptage pour {dm.userInfos}</h3>
        </CardHeader>

        <CardBody>
          <Form role="form" onSubmit={onSubmit}>
            <Row className=" justify-content-center">
              Copier le Key reçu par mail
              <Input
                type="textarea"
                name="key"
                value={key}
                onChange={handleChange("key")}
              />
              <Button
                className="my-4 btn-outline-success"
                color="dark"
                type="submit"
              >
                Confirmer
              </Button>
              <Button
                className="my-4 btn-outline-danger"
                onClick={() => {
                  props.setShowModal(false), setData(initialFieldValues);
                }}
              >
                Annuler
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default DecryptDemande;
