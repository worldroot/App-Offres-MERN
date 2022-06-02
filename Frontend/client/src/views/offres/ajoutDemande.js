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
          <h3 className="mb-0 text-red">Ajouter une demande pour l'offre</h3>
          <p className="text-dark">{props.currentObj.titre}</p>
        </CardHeader>

        <CardBody className="justify-content-center">
          <Form role="form" onSubmit={onSubmit}>
            <Row className="justify-content-center">
              <p className="text-center text-dark">
                Votre prix
                <Input
                  type="number"
                  step="0.1"
                  name="prix"
                  value={data.prix}
                  onChange={handleChange("prix")}
                  className="my-2"
                />
                {props.currentObj.prixdebut !== "" && (
                   <small className="text-gray">A partir de {props.currentObj.prixdebut} dt</small>
                )}
                
              </p>
            </Row>
            <Row className="justify-content-center">
              <Button
                className="btn-outline-success"
                type="submit"
                color="dark"
              >
                Confirmer
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <AnimatePresence
        exitBeforeEnter
        showModal={showImg}
        setShowModal={setShowImg}
      >
        {showImg && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Col className=" fixed-top center" xl="5">
              <motion.div variants={modal}>
                <img
                  onClick={() => setShowImg(false)}
                  className="img-fluid rounded shadow avatar avatar-lg w-auto h-auto"
                  src={values.image[currentIndex]}
                  alt=""
                />
                <br></br>
                <small className=" text-white">Click image to hide</small>
              </motion.div>
            </Col>
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
