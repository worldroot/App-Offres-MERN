import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { allPub } from "redux/offres/offreActions";
import { connect } from "react-redux";
import PaginationComponent from "components/Pagination.js";
import { motion, AnimatePresence } from "framer-motion";
import "../../components/Loading/loading.css";
import "components/modal.css";
import DetailsOffre from "./detailsOffre";
import AjoutDemande from "./ajoutDemande";
import { Redirect } from "react-router-dom";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: "50px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Offres = ({ ...props }) => {
  useEffect(() => {
    props.AllPub();
  }, []);

  const userExist = localStorage.getItem("user");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  const [Search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const offresPerPage = 3;
  const data = props.Listpub;

  const offresData = useMemo(() => {
    let computed = data;
    if (Search) {
      computed = computed.filter((i) =>
        i.offre.titre.toLowerCase().includes(Search.toLowerCase())
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [data, currentPage, Search]);

  const sty = {
    height: 400,
    width: 350,
  };

  if (userExist) return <Redirect to="/offres" />;

  if (!offresData) return <p>Pas d'offre disponible</p>;

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className=" py-xl-9">
          {/* Content */}
          <Container className="mt--8  py-xl-7">
            <Row className="justify-content-center">
              <h1 className="text-center text-red">Les appels d'offres</h1>
            </Row>
           {props.isLoading ? (
              <div className="text-center">
                <div id="loading"></div>
              </div>
            ) : (
              <>
            <Row className="justify-content-center">
              <Form className="navbar-search navbar-search-dark mb-2 mt-2">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative border-dark">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search text-dark" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="text-dark"
                      type="text"
                      onChange={(event) => {
                        setSearch(event.target.value), setCurrentPage(1);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
              <Form className="navbar-search navbar-search-dark mb-2 mt-2 mx-2">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative border-dark">
                    <Input
                      className="text-dark"
                      type="select"
                      onChange={(event) => {
                        setSearch(event.target.value), setCurrentPage(1);
                      }}
                    >
                      <option>Choisis une catégorie</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
 
                <Row xs={1} md={3} className="g-4">
                  {offresData.map((of, index) => {
                    return (
                      <Fragment key={index}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5 }}
                        >
                          <Col>
                            <Card className="m-1" style={sty}>
                              <CardBody className="text-dark">
                                <div className="text-center">
                                  <img
                                    className="img-fluid rounded avatar avatar-lg w-50 h-50"
                                    src={of.image[0]}
                                    alt=""
                                  />
                                </div>
                                <Row>
                                  <h3>{of.titre}</h3>
                                </Row>
                                <Row>
                                  <small>Categorie: {of.category}</small>
                                </Row>
                                <Row>
                                  <small>Prix debut (dt): {of.prixdebut}</small>
                                </Row>
                                <Row>
                                  <small className="text-danger">
                                    Date Debut: {of.dateDebut.substring(0, 10)}
                                  </small>
                                </Row>
                                <Row>
                                  <small className="text-danger">
                                    Date Limite: {of.dateFin.substring(0, 10)}
                                  </small>
                                </Row>
                              </CardBody>
                              <CardFooter className="border-0">
                                <Row>
                                  <a
                                    className="card-link text-underline text-gray"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setShowModal(true), setCurrentObj(of);
                                    }}
                                  >
                                    <small>Details</small>
                                  </a>
                                </Row>
                              </CardFooter>
                            </Card>
                          </Col>
                        </motion.div>
                      </Fragment>
                    );
                  })}
                </Row>
                <Row>
                  <PaginationComponent
                    total={pageNumber}
                    itemsPerPage={offresPerPage}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </Row>
              </>
            )}

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
                  <Col className=" fixed-top center" xl="5">
                    <motion.div className="" variants={modal}>
                      <DetailsOffre
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

            <AnimatePresence
              exitBeforeEnter
              showModal={showModal2}
              setShowModal={setShowModal2}
            >
              {showModal2 && (
                <motion.div
                  className="backdrop"
                  variants={backdrop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Col className="fixed-top center" xl="5">
                    <motion.div className="" variants={modal}>
                      <AjoutDemande
                        {...{
                          currentObj,
                          setCurrentObj,
                          showModal2,
                          setShowModal2,
                        }}
                      />
                    </motion.div>
                  </Col>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </div>

        <AuthFooter />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  Listpub: state.offres.offres,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.offres.loading,
});

const mapActionToProps = {
  AllPub: allPub,
};

export default connect(mapStateToProps, mapActionToProps)(Offres);
