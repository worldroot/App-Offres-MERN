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
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import { getAllCat, getAllSousCat } from "redux/cat/catActions";
import useForm from "helpers/useFormObj";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
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

  useEffect(() => {
    props.All();
    props.AllSous();
  }, []);

  const userExist = localStorage.getItem("user");
  const [showImg, setShowImg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const ImgStyle = {
    height: 300,
    width: 500
  };

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Card className="overflow-auto h-100vh">
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => props.setShowModal3(false)}
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
                  {values.prixdebut.length === 0 ? (
                    <p className="text-dark"> Prix début ouvert </p>
                  ) : (
                    <p className="text-dark">
                      À partir de: {values.prixdebut} dt
                    </p>
                  )}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <p>Posté par: {values.postedBy}</p>
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
                  <AliceCarousel mouseDragEnabled>
                    {values.image.map((img, index) => (
                      <Fragment key={index}>
                        <div className="text-center">
                          <img
                            onClick={() => {
                              setShowImg(true), setCurrentIndex(index);
                            }}
                            className="img-fluid rounded shadow avatar avatar-lg w-50 h-50"
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

    </>
  );
};

const mapActionToProps = {
  All: getAllCat,
  AllSous: getAllSousCat,
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListC: state.categories.categories,
  ListSC: state.categories.souscategories,
});

export default connect(mapStateToProps, mapActionToProps)(DetailsOffre);
