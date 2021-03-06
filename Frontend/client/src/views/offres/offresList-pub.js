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
  CardHeader,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { allPub } from "redux/offres/offreActions";
import { getAllCat } from "redux/cat/catActions";
import { connect } from "react-redux";
import PaginationComponent from "components/Pagination.js";
import { motion, AnimatePresence } from "framer-motion";
import "../../components/Loading/loading.css";
import "components/modal.css";
import DetailsOffre from "./detailsOffre";
import AjoutDemande from "./ajoutDemande";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import usePrevious from "helpers/usePrevious";
import { AddDem } from "redux/offres/offreActions";

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
const msgmodal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "150px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Offres = ({ ...props }) => {
  useEffect(() => {
    props.AllPub();
    props.AllCat();
  }, []);

  const userExist = localStorage.getItem("user");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  const [checked, setchecked] = useState(false);
  const [showSucc, setShowSucc] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const prev_loading = usePrevious(props.isLoadingDem);
  useEffect(() => {
    console.log(prev_loading);
    console.log(props.isLoadingDem);
    if (prev_loading && !props.isLoadingDem) {
      if (props.CodeMsg === 1) {
        props.AllPub();
        //setShowModal2(false);
        setShowSucc(true);
      }
      if (props.CodeMsg === 0) {
        setShowErr(true);
        //toast.error("Probl??me lors de l'ajout !");
      }
    }
  }, [props.isLoadingDem, props.Listpub]);

  const [Search, setSearch] = useState("");
  const [SearchCat, setSearchCat] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const offresPerPage = 6;

  const data = props.Listpub;
  let history = useHistory();
  const offresData = useMemo(() => {
    let computed = data;
    if (Search) {
      computed = computed.filter((i) =>
        i.titre.toLowerCase().includes(Search.toLowerCase())
      );
    }
    if (SearchCat) {
      computed = computed.filter((i) =>
        i.souscategory.toLowerCase().includes(SearchCat.toLowerCase())
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [data, currentPage, Search, SearchCat]);

  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const img = {
    height: 200,
    width: 220,
  };

  return (
    <>
      <div className="main-content">
        <AuthNavbar />

        {/* Content */}
        <Container className="mt-4 mb-4 py-4 w-100vh h-100vh">
          <Row className="justify-content-center">
            <h1 className="text-center text-red">Les appels d'offres</h1>
          </Row>
          {props.isLoading ? (
            <div className="text-center mt-4 mb-4 py-4 p-xl-9">
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
                    <InputGroup className="border-dark">
                      <UncontrolledDropdown
                        className=" border-dark rounded border-darker shadow-none"
                        direction="right"
                      >
                        <DropdownToggle caret>
                          <i className="mx-1 fas fa-sort text-dark" />
                          Filtrage par cat??gorie
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
                                    onClick={() => {
                                      setchecked(false);
                                      setSearchCat("");
                                      setCurrentPage(1);
                                    }}
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
                                              {!checked && (
                                                <Input
                                                  className="text-dark"
                                                  type="checkbox"
                                                  value={sousnomcat}
                                                  onChange={(event) => {
                                                    if (event.target.checked) {
                                                      setSearchCat(
                                                        event.target.value
                                                      );
                                                      setchecked(true);
                                                      setCurrentPage(1);
                                                    } else {
                                                      setSearchCat("");
                                                      setCurrentPage(1);
                                                      setchecked(false);
                                                    }
                                                  }}
                                                />
                                              )}

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
                        transition={{ duration: 1.5 }}
                      >
                        <Col>
                          <Card className="m-2 cardStyle">
                            <CardBody className="text-dark">
                              <div className="text-center">
                                <img
                                  className="img-fluid rounded avatar avatar-lg m-2"
                                  style={img}
                                  src={of.image[0]}
                                  alt=""
                                />
                              </div>
                              <Row>
                                <h3>{of.titre.substring(0, 25)}</h3>
                              </Row>
                              <Row>
                                <small>
                                  Categorie: {of.category} - {of.souscategory}
                                </small>
                              </Row>

                              <Row>
                                {of.prixdebut.length === 0 ? (
                                  <small> Prix d??but ouvert </small>
                                ) : (
                                  <small>?? partir de: {of.prixdebut} dt</small>
                                )}
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
                            {userLocal.active ? (
                              <CardFooter className="text-center">
                                <Row className="justify-content-center">
                                  <Button
                                    className="btn-outline-danger"
                                    color="dark"
                                    onClick={() => {
                                      setShowModal2(true), setCurrentObj(of);
                                    }}
                                  >
                                    Soumettre une demande
                                  </Button>
                                </Row>
                              </CardFooter>
                            ) : (
                              <CardFooter className="text-center">
                                <Row className="justify-content-center">
                                  <Button
                                    className="btn-outline-danger"
                                    color="dark"
                                    onClick={() => {
                                      toast.info(
                                        "Connectez ou cr??er un compte pour soumettre une demande !"
                                      );
                                    }}
                                  >
                                    Soumettre une demande
                                  </Button>
                                </Row>
                              </CardFooter>
                            )}
                            {/* connexion requise */}
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
                <Row className="justify-content-center p-md-3 py-5">
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

          {/* Offre Details  */}
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
                <Col className=" fixed-top center" xl="8">
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

          {/* Ajout Demande  */}
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
                <Col className="fixed-top center" xl="8">
                  <motion.div className="" variants={modal}>
                    <AjoutDemande
                      {...{
                        currentObj,
                        setCurrentObj,
                        showModal2,
                        setShowModal2,
                      }}
                      create={(data) => props.create(data, setShowSucc(true))}
                    />
                  </motion.div>
                </Col>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>

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
              <Col className=" fixed-top center" xl="3">
                <motion.div className="" variants={msgmodal}>
                  <Card className=" bg-success ">
                    <CardHeader className="bg-success border-0 justify-content-center text-center">
                      <i class="far fa-check-circle fa-6x text-white text-center"></i>
                    </CardHeader>
                    <CardBody>
                      <Row className=" justify-content-center">
                        <h1 className="text-white text-center">
                          Votre soumission a ??t?? valid??e
                        </h1>
                      </Row>
                      <Row className=" justify-content-center">
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

        {/* Pop up Error */}
        <AnimatePresence
          exitBeforeEnter
          showModal={showErr}
          setShowModal={setShowErr}
        >
          {showErr && (
            <motion.div
              className="backdrop"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Col className=" fixed-top center" xl="3">
                <motion.div className="" variants={msgmodal}>
                  <Card className=" bg-danger ">
                    <CardHeader className="bg-danger border-0 justify-content-center text-center">
                      <i className="far fa-times-circle fa-6x text-white text-center"></i>
                    </CardHeader>
                    <CardBody>
                      <Row className=" justify-content-center">
                        <h1 className="text-white text-center">
                          Quelque chose s'est mal pass??
                        </h1>
                      </Row>
                      <Row className=" justify-content-center">
                        <Button
                          className="btn-outline-white"
                          onClick={() => setShowErr(false)}
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  Listpub: state.offres.offres,
  ListCat: state.category.categories,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.offres.loading,
  isLoadingDem: state.offres.loading_dem,
  CodeMsg: state.offres.codeMsg,
});

const mapActionToProps = {
  AllPub: allPub,
  AllCat: getAllCat,
  create: AddDem,
};

export default connect(mapStateToProps, mapActionToProps)(Offres);
