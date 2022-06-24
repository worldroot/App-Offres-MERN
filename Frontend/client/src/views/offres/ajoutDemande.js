// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
} from "reactstrap";
// core components
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AddDem } from "redux/offres/offreActions";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "components/modal.css";
import "./offre.css";
import { toast } from "react-toastify";

const AjoutDemande = ({ ...props }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const userExist = localStorage.getItem("user");
  const [showImg, setShowImg] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const initialFieldValues = {
    prix: "",
    offre: "",
  };
  const [data, setData] = useState(initialFieldValues);

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const prixProposed = parseFloat(data.prix);
    const prixOffre = parseFloat(props.currentObj.prixdebut);
    if (prixProposed < prixOffre) {
      toast.error("Vérifier votre prix");
    } else {
      props.create(data);
      props.setShowModal2(false);
    }
  };

  const handleChange = (name) => (event) => {
    setData({ [name]: event.target.value, offre: props.currentObj._id });
  };

  return (
    <>
      <Card>
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => props.setShowModal2(false)}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0">
          <h3 className="mb-0 text-red">Soumettre une demande pour l'offre</h3>
          <p className="text-dark text-underline">{props.currentObj.titre}</p>
        </CardHeader>

        <CardBody className="justify-content-center mt--5">

            {showConfirm ? (
              <div>
                <Row className="justify-content-center">
                  <h3 className="text-dark">
                    Êtes-vous sûr de soumettre {data.prix} dt ?
                  </h3>
                </Row>
                <Row className="justify-content-center">
                  <Button
                    className="btn-outline-success"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Confirmer
                  </Button>
                  <Button
                    className="btn-outline-danger"
                    onClick={()=>{setShowConfirm(false)}}
                  >
                    Annuler 
                  </Button>
                </Row>
              </div>
            ) : (
              <div>
                <Row className="justify-content-center">
                  <p className="text-center text-dark">
                    Votre prix en dt
                    <Input
                      className="border border-dark"
                      type="number"
                      step="0.1"
                      name="prix"
                      value={data.prix}
                      onChange={handleChange("prix")}
                    />
                    {props.currentObj.prixdebut !== "" && (
                      <small className="text-gray">
                        A partir de {props.currentObj.prixdebut} dt 
                      </small>
                    )}
                  </p>
                </Row>
                <Row className="justify-content-center">
                  <Button
                    className="btn-success"
                    onClick={() => setShowConfirm(true)}

                  >
                    Suivant
                  </Button>
                </Row>
              </div>
            )}

        </CardBody>
      </Card>
    </>
  );
};

const mapActionToProps = {
  create: AddDem,
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
});

export default connect(mapStateToProps, mapActionToProps)(AjoutDemande);
