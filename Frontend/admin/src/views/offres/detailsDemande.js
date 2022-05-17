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
import React, { Fragment, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allOffresDems } from "redux/offres/offreActions";
import "components/modal.css";
import "./offre.css";
import { connect, useDispatch } from "react-redux";
import useForm from "helpers/useFormObj";
const initialFieldValues = { key: "" };

const DetailsDemande = ({ ...props }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const dispatch = useDispatch();
  const [data, setData] = useState(initialFieldValues);
  const { key } = data;
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const Offre = props.currentObj;
  const userExist = localStorage.getItem("user");

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  const [showModal, setShowModal] = useState(false);

  const reset = (e) => {
    props.setShowDemande(false);
    setData(initialFieldValues);
  };

  return (
    <>
      <Card>
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => reset()}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0 ">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Details d'offre - {Offre.titre}</h3>
          <small>
            Prix à partir de <p className="text-red">{Offre.prixdebut} dt</p>{" "}
          </small>
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
                  {Offre.demandes.map((dm, index) => {
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
                              onClick={() => {
                                setShowModal(true);
                              }}
                            >
                              Décrypter
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <AnimatePresence
                            exitBeforeEnter
                            showModal={showModal}
                            setShowModal={setShowModal}
                          >
                            {showModal && (
                              <motion.div
                                className="backdrop"
                                variants={backdrop}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                              >
                                <Col className=" fixed-top center" xl="6">
                                  <motion.div className="" variants={modal}>
                                    <Card>
                                      <CardHeader className="text-center border-0">
                                        <div className="d-flex justify-content-between"></div>
                                        <h3 className="mb-0 text-dark">
                                          Décryptage pour {dm.userInfos}
                                        </h3>
                                      </CardHeader>

                                      <CardBody>
                                        <Form role="form">
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
                                                setShowModal(false),
                                                  setData(initialFieldValues);
                                              }}
                                            >
                                              Annuler
                                            </Button>
                                          </Row>
                                        </Form>
                                      </CardBody>
                                    </Card>
                                  </motion.div>
                                </Col>
                              </motion.div>
                            )}
                          </AnimatePresence>
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

const mapStateToProps = (state) => ({
  List: state.offres.offdems,
  isLoading: state.offres.loading,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: allOffresDems,
};

export default connect(mapStateToProps, mapActionToProps)(DetailsDemande);
