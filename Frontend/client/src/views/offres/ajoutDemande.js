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
import CurrencyInput from "react-currency-input-field";

const AjoutDemande = ({ ...props }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "150px",
      x: "0px",
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };
  const userExist = localStorage.getItem("user");
  const [showImg, setShowImg] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSucc, setShowSucc] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
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
      setTimeout(() => {
        setShowConfirm(true);
      }, 1000);
    }
  };

  const handleChange = (name) => (event) => {
    setData({ [name]: event.target.value, offre: props.currentObj._id });
  };

  useEffect(() => {
    if (showConfirm) {
      if (data.prix <= props.currentObj.prixdebut) {
        setShowConfirm(false);
        setShowWarn(true);
      }
    }
  }, [data.prix, showConfirm]);

  //console.log(data.prix);
  /*   console.log(showConfirm);
  console.log(props.currentObj.prixdebut);
  */

  return (
    <>
      <Card className=" overflow-auto h-100vh cardDemande">
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
        <Row>
          {/* Demamde */}
          <Col lg="4">
            <CardHeader className="border-0">
              <h2 className="text-red">Soumettre une demande pour l'offre</h2>
              <h2 className="text-dark">{props.currentObj.titre}</h2>
            </CardHeader>
            <CardBody className="justify-content-center ">
              {showConfirm ? (
                <div>
                  <Row>
                    <Col>
                      <h2 className="text-dark">
                        Êtes-vous sûr de soumettre {data.prix} dt ?
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        className="btn-outline-success"
                        type="submit"
                        onClick={onSubmit}
                      >
                        Confirmer
                      </Button>
                      <Button
                        className="btn-outline-danger"
                        onClick={() => {
                          setShowConfirm(false);
                        }}
                      >
                        Annuler
                      </Button>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row>
                    <Col>
                      <p className="text-dark">Votre prix en dt</p>
                      <CurrencyInput
                        name="prix"
                        className="form-control border border-dark"
                        defaultValue={data.prix}
                        onChange={handleChange("prix")}
                      />

                      {props.currentObj.prixdebut !== "" && (
                        <small className="text-red">
                          A partir de {props.currentObj.prixdebut} dt
                        </small>
                      )}
                      <Button
                        className="btn-default my-3"
                        onClick={() => setShowConfirm(true)}
                      >
                        Suivant
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            </CardBody>
          </Col>
          {/* Offre details */}
          <Col lg="8">
            <CardBody className=" justify-content-center border-left">
              <Form role="form">
                <h2 className="text-gray">
                  Détails de {props.currentObj.titre}
                </h2>
                <Button
                  onClick={() => {
                    setShowSucc(true);
                  }}
                ></Button>
                <Row className="justify-content-center">
                  <Col>
                    <FormGroup>
                      {props.currentObj.prixdebut.length === 0 ? (
                        <p className="text-dark"> Prix début ouvert </p>
                      ) : (
                        <p className="text-dark">
                          À partir de: {props.currentObj.prixdebut} dt
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <p>
                        Catégories:
                        <label className="form-control-label text-dark mx-2">
                          {props.currentObj.category}
                        </label>
                      </p>
                    </FormGroup>
                    <FormGroup>
                      <p>
                        Sous-catégories:
                        <label className="form-control-label text-dark mx-2">
                          {props.currentObj.souscategory}
                        </label>
                      </p>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <p>
                        Date début :
                        <label className="form-control-label text-dark mx-2">
                          {props.currentObj.dateDebut.substring(0, 10)}
                        </label>
                      </p>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <p>
                        Date fin :
                        <label className="form-control-label text-dark mx-2">
                          {props.currentObj.dateFin.substring(0, 10)}
                        </label>
                      </p>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <p>
                        Description:
                        <label className="form-control-label text-dark mx-2">
                          {props.currentObj.description}
                        </label>
                      </p>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <AliceCarousel>
                        {props.currentObj.image.map((img, index) => (
                          <Fragment key={index}>
                            <div className="text-center">
                              <img
                                onClick={() => {
                                  setShowImg(true), setCurrentIndex(index);
                                }}
                                className="img-fluid rounded shadow avatar avatar-lg w-75 h-50"
                                src={img}
                                alt=""
                              />
                            </div>
                          </Fragment>
                        ))}
                      </AliceCarousel>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Col>
        </Row>
      </Card>
      {/* Pop up Success */}
      <AnimatePresence
        exitBeforeEnter
        showModal={showSucc}
        setShowModal={setShowSucc}
      >
        {showSucc && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Col className=" fixed-top center" xl="5">
              <motion.div className="" variants={modal}>
                <Card className=" bg-success pointer-event cardmsg">
                  <CardHeader className="bg-success border-0 justify-content-center text-center">
                    <i class="far fa-check-circle fa-6x text-white text-center"></i>
                  </CardHeader>
                  <CardBody>
                    <Row className=" justify-content-center">
                      <h1 className="text-white text-center">
                        Votre soumission a été validée
                      </h1>
                      <Button
                        className="btn-outline-white"
                        onClick={() => setShowSucc(false)}
                      >
                        OK
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop up Warn */}
      <AnimatePresence
        exitBeforeEnter
        showModal={showWarn}
        setShowModal={setShowWarn}
      >
        {showWarn && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="" variants={modal}>
              <Card className=" bg-warning pointer-event cardmsg">
                <CardHeader className="bg-warning border-0 justify-content-center text-center ">
                  <i class="fas fa-exclamation-triangle fa-6x text-white text-center"></i>
                </CardHeader>
                <CardBody>
                  <Row className=" justify-content-center text-center">
                    <Col>
                      <h1 className="text-white">
                        {`Attention ! Votre prix doit dépasser le prix initial de l'offre ${props.currentObj.titre}`}
                      </h1>
                      <Button
                        className="btn-outline-white"
                        onClick={() => setShowWarn(false)}
                      >
                        OK
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
