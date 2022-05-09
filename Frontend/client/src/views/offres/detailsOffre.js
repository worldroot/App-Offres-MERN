// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col
} from "reactstrap";
// core components
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import useForm from "helpers/useFormObj";
import { motion, AnimatePresence } from "framer-motion";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "components/modal.css";
import "./offre.css";
const initialFieldValues = {
  titre: "",
  description: "",
  image: [],
  dateDebut: "",
  dateFin: "",
  souscategory: "",
  category: "",
  prixdebut: "",
};

const DetailsOffre = ({ ...props }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    if (props.currentObj !== {}) {
      setValues({ ...props.currentObj });
      setErrors({});
    }
  }, [props.currentObj]);

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentObj);

  const userExist = localStorage.getItem("user");
  const [showImg, setShowImg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const ImgStyle = {
    width: "200px",
    height: "200px"
  };

  return (
    <>
      <Card>
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => props.setShowModal(false)}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Details d'offre </h3>
          <small>{values.titre}</small>
        </CardHeader>

        <CardBody className=" justify-content-center">
          <Form role="form">
            <Row>
              <Col>
                <FormGroup>
                  <p>
                    Prix debut:
                    <label className="form-control-label text-dark mx-2">
                      {values.prixdebut} dt
                    </label>
                  </p>
                </FormGroup>
              </Col>
             
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <p>
                    Catégories:
                    <label className="form-control-label text-dark mx-2">
                      {values.category}
                    </label>
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <p>
                    Sous-catégories:
                    <label className="form-control-label text-dark mx-2">
                      {values.souscategory}
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
                      {values.dateDebut.substring(0, 10)}
                    </label>
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <p>
                    Date fin :
                    <label className="form-control-label text-dark mx-2">
                      {values.dateFin.substring(0, 10)}
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
                      {values.description}
                    </label>
                  </p>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <AliceCarousel mouseDragEnabled >
                    {values.image.map((img, index) => (
                      <Fragment key={index}>
                        <div className="text-center">
                          <img
                          onClick={() => {
                            setShowImg(true), setCurrentIndex(index);
                          }}
                          className="img-fluid rounded shadow avatar avatar-lg w-25 h-25"
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


const mapStateToProps = (state) => ({
  List: state.offres.offres,
});

export default connect(mapStateToProps)(DetailsOffre);
