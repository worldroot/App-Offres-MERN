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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { allOffres } from "redux/offres/offreActions";
import { getAllCat } from "redux/cat/catActions";
import { connect } from "react-redux";
import { refreshJwt } from "redux/auth/authActions";
import PaginationComponent from "components/Pagination.js";
import { motion, AnimatePresence } from "framer-motion";
import "../../components/Loading/loading.css";
import "components/modal.css";
import DetailsOffre from "./detailsOffre";
import AjoutDemande from "./ajoutDemande";
import decode from "jwt-decode";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Offres = ({ ...props }) => {
  useEffect(() => {
    props.All();
    props.AllCat();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = decode(accessToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(refreshJwt({ refreshToken }));
      }
    }
  }, []);

  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const userExist = localStorage.getItem("user");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  const [Search, setSearch] = useState("");
  const [SearchCat, setSearchCat] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const offresPerPage = 6;
  const data = props.List;

  const offresData = useMemo(() => {
    let computed = props.List;
    if (Search) {
      computed = computed.filter((i) =>
        i.offre.titre.toLowerCase().includes(Search.toLowerCase())
      );
    }
    if (SearchCat) {
      computed = computed.filter((i) =>
        i.offre.souscategory.toLowerCase().includes(SearchCat.toLowerCase())
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [data, currentPage, Search, SearchCat]);

  const img = {
    height: 170,
    width: 170,
  };

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className=" py-xl-6 position-relative w-100vh h-100vh">
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
                  <Form className="mb-2 mt-2">
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
                  <Form className="mb-2 mt-2 mx-2">
                    <FormGroup className="mb-0">
                      <InputGroup className="border-dark ">
                        <UncontrolledDropdown
                          className="border-dark rounded border-darker shadow-none"
                          direction="right"
                        >
                          <DropdownToggle caret>
                            <i className="mx-1 fas fa-sort text-dark" />
                            Filtrage par catégorie
                          </DropdownToggle>
                          <DropdownMenu>
                            {props.ListCat.map((cat, index) => {
                              return (
                                <Fragment key={index}>
                                  <Accordion className="shadow-none">
                                    <AccordionSummary
                                      aria-controls="panel1bh-content"
                                      expandIcon={
                                        <i className="fas fa-angle-down fa-1x"></i>
                                      }
                                    >
                                      <span className="mb-0 text-sm font-weight-bold">
                                        {cat.nomcat}
                                      </span>
                                      {/*  <span className="mx-2 text-sm font-weight-bold text-gray">
                                        ({cat.souscategorie.length})
                                      </span> */}
                                    </AccordionSummary>
                                    {cat.souscategorie.map(
                                      ({ sousnomcat }, index2) => {
                                        return (
                                          <Fragment key={index2}>
                                            <AccordionDetails>
                                              <Row className="border-1 justify-content-between mx-3">
                                                <Input
                                                  className="text-dark"
                                                  type="checkbox"
                                                  value={sousnomcat}
                                                  onChange={(event) => {
                                                    if (event.target.checked) {
                                                      setSearchCat(
                                                        event.target.value
                                                      );
                                                      setCurrentPage(1);
                                                    } else {
                                                      setSearchCat("");
                                                      setCurrentPage(1);
                                                    }
                                                  }}
                                                />
                                                <small className="text-gray">
                                                  {sousnomcat}
                                                </small>
                                              </Row>
                                            </AccordionDetails>
                                          </Fragment>
                                        );
                                      }
                                    )}
                                  </Accordion>
                                </Fragment>
                              );
                            })}
                          </DropdownMenu>
                        </UncontrolledDropdown>
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
                          transition={{ duration: 1 }}
                        >
                          <Col>
                            <Card className="m-1 cardStyle">
                              <CardBody className="text-dark">
                                <div className="text-center">
                                  <img
                                    style={img}
                                    className="img-fluid rounded avatar avatar-lg "
                                    src={of.offre.image[1]}
                                    alt=""
                                  />
                                </div>
                                <Row>
                                  <h3>{of.offre.titre}</h3>
                                </Row>
                                <Row>
                                  <small>
                                    Categorie: {of.offre.category} -{" "}
                                    {of.offre.souscategory}
                                  </small>
                                </Row>
                                <Row>
                                  {of.offre.prixdebut === "" ? (
                                    <small> Prix début ouvert </small>
                                  ) : (
                                    <small>
                                      À partir de: {of.offre.prixdebut} dt
                                    </small>
                                  )}
                                </Row>
                                <Row>
                                  <small className="text-danger">
                                    Date Debut:
                                    {of.offre.dateDebut.substring(0, 10)}
                                  </small>
                                </Row>
                                <Row>
                                  <small className="text-danger">
                                    Date Limite:
                                    {of.offre.dateFin.substring(0, 10)}
                                  </small>
                                </Row>
                                <Row>
                                  <a
                                    className="card-link text-underline text-gray"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setShowModal(true),
                                        setCurrentObj(of.offre);
                                    }}
                                  >
                                    <small>Details</small>
                                  </a>
                                </Row>
                              </CardBody>
                              {userLocal.active && (
                                <CardFooter className="text-center">
                                  {of.exist ? (
                                    <Row className="justify-content-center">
                                      <small className="text-gray">
                                        Demande deja exist
                                      </small>
                                    </Row>
                                  ) : (
                                    <Row className="justify-content-center">
                                      <Button
                                        className="btn-outline-danger"
                                        color="dark"
                                        onClick={() => {
                                          setShowModal2(true),
                                            setCurrentObj(of.offre);
                                        }}
                                      >
                                        Ajouter une demande
                                      </Button>
                                    </Row>
                                  )}
                                </CardFooter>
                              )}
                            </Card>
                          </Col>
                        </motion.div>
                      </Fragment>
                    );
                  })}
                </Row>
                {showModal2 || showModal ? (
                  <motion.div animate={{ opacity: 0 }}>
                    <Row className="justify-content-center">
                      <PaginationComponent
                        total={pageNumber}
                        itemsPerPage={offresPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </Row>
                  </motion.div>
                ) : (
                  <Row className="justify-content-center my-3">
                    <PaginationComponent
                      total={pageNumber}
                      itemsPerPage={offresPerPage}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </Row>
                )}
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
        <div>
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offdems,
  ListCat: state.category.categories,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.offres.loading,
});

const mapActionToProps = {
  All: allOffres,
  AllCat: getAllCat,
};

export default connect(mapStateToProps, mapActionToProps)(Offres);
