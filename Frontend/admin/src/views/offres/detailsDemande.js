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
import DecryptDemande from "./decryptDemande";

const DetailsDemande = ({ ...props }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [currentObj, setCurrentObj] = useState({});
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
              {props.loadingDec ? (
                <div className="text-center my-3">
                  <div id="loading1"></div>
                </div>
              ) : (
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

                            {dm.prix.length > 50 ? (
                              <>
                                <td>
                                  <i className="fas fa-lock mx-2"></i>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-outline-success"
                                    size="sm"
                                    onClick={() => {
                                      setShowModal(true), setCurrentObj(dm);
                                    }}
                                  >
                                    Décrypter
                                  </Button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td>
                                  <i className="fas fa-lock-open mx-2"> </i>
                                  {dm.prix} Dt
                                </td>
                                <td>
                                  <Button
                                    disabled
                                    className="btn btn-outline-dark border-dark"
                                    size="sm"
                                    onClick={() => {
                                      setShowModal(true), setCurrentObj(dm);
                                    }}
                                  >
                                    Décrypter
                                  </Button>
                                </td>
                              </>
                            )}
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Row>
          </Form>
        </CardBody>
      </Card>

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
            <Col className=" fixed-top center" xl="7">
              <motion.div className="" variants={modal}>
                <DecryptDemande
                  {...{
                    currentObj,
                    setCurrentObj,
                    showModal,
                    setShowModal,
                  }}
                />
              </motion.div>
            </Col>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offdems,
  isLoading: state.offres.loading,
  loadingDec: state.offres.loading_decrypt,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: allOffresDems,
};

export default connect(mapStateToProps, mapActionToProps)(DetailsDemande);
