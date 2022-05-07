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
  DropdownItem,
} from "reactstrap";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { allOffres, Demandesuser } from "redux/offres/offreActions";
import { connect } from "react-redux";
import PaginationComponent from "components/Pagination.js";
import { motion, AnimatePresence } from "framer-motion";
import "../../components/Loading/loading.css";
import "components/modal.css";
import DetailsOffre from "./detailsOffre";

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
    props.AllDem();
  }, []);

  useEffect(() => {
    props.DemList.map((dm) => {
      setOffreID(dm.offre);
    });
  });

  const [showModal, setShowModal] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  
  const [Search, setSearch] = useState("");
  const [Cat, setCat] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [OffreID, setOffreID] = useState("");
  const Data = props.List;
  const offresPerPage = 3;

  const offresData = useMemo(() => {
    let computed = Data;

    if (Search) {
      computed = computed.filter(
        (of) =>
          of.titre.toLowerCase().includes(Search.toLowerCase()) ||
          of.category.includes(Search)
      );
    }

    setPageNumber(computed.length);

    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [Data, currentPage, Search]);

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
                        <Card className="m-1">
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
                            <Row>
                              <Button
                                className="btn-outline-dark"
                                color="dark"
                                onClick={()=>{setShowModal(true)}}
                                size="sm"
                              >
                                Details
                              </Button>
                            </Row>
                          </CardBody>
                          <CardFooter className="text-center">
                            {OffreID === of._id ? (
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
                                  type="submit"
                                >
                                  Ajouter une demande
                                </Button>
                              </Row>
                            )}
                          </CardFooter>
                        </Card>
                      </Col>
                    </motion.div>
                  </Fragment>
                );
              })}
            </Row>
            <PaginationComponent
              total={pageNumber}
              itemsPerPage={offresPerPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />

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
          </Container>
        </div>

        <AuthFooter />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  DemList: state.offres.demandes,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: allOffres,
  AllDem: Demandesuser,
};

export default connect(mapStateToProps, mapActionToProps)(Offres);
