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
  demandes: [],
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
    width: "200px",
    height: "200px",
  };

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Card>
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => props.setShowDemande(false)}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Details d'offre - {values.titre}</h3>
          <small>Prix à partir de  <p className="text-red">{values.prixdebut} dt</p> </small>
        </CardHeader>

        <CardBody className=" justify-content-center">
          <Form role="form">
            <Row>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email Utilisateur</th>
                    <th scope="col">Date de demande</th>
                    <th scope="col">Prix proposé</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {props.currentObj.demandes.map((dm, index) => {
                    return (
                      <Fragment key={index}>
                        <tr key={dm._id}>
                          <td>{dm.userInfos}</td>
                          <td>{dm.createdAt.substring(0, 10)}</td>
                          <td>
                            {dm.prix.length > 50 ? (
                              <i className="fas fa-lock"></i>
                            ) : (
                              dm.prix
                            )}
                          </td>
                          <td>
                            <Button
                              className="btn btn-outline-success"
                              size="sm"
                            >
                              Décrypter
                            </Button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
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
