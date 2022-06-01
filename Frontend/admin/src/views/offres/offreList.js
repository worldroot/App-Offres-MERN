import {
  Row,
  Card,
  CardHeader,
  Table,
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import Header from "../../components/Headers/Header.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PaginationComponent from "components/Pagination.js";
import { connect, useDispatch } from "react-redux";
import { allOffres, deleteOffre } from "redux/offres/offreActions";
import { refreshJwt } from "redux/auth/authActions";
import { Fragment, useEffect, useState, useMemo } from "react";
import Offre from "./offre.js";

import { motion, AnimatePresence } from "framer-motion";
import "components/modal.css";
import UpdateOffre from "./updateOffre.js";
import DetailsOffre from "./detailsOffre.js";
import decode from "jwt-decode";
import "../../components/Loading/loading.css";
import { addOffre } from "redux/offres/offreActions.js";
import usePrevious from "helpers/usePrevious.js";
import { toast } from "react-toastify";
import { updateStatus } from "redux/offres/offreActions.js";

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

const OffreList = ({ ...props }) => {
  useEffect(() => {
    props.All();
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

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [currentObj, setCurrentObj] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const onDLF = (id) => {
    const onSuccess = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
    if (window.confirm("Êtes-vous sûr ?")) dispatch(deleteOffre(id, onSuccess));
  };

  const onStatus = (id) => {
    dispatch(updateStatus(id));
  };

  var date = new Date();
  const DatetoCheck = new Date(date.getTime());

  const [Search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const Data = props.List;
  const offresPerPage = 8;

  const offresData = useMemo(() => {
    let computed = Data;
    if (Search) {
      computed = computed.filter((of) =>
        of.titre.toLowerCase().includes(Search.toLowerCase())
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [Data, currentPage, Search]);

  const prev_loading = usePrevious(props.isLoadingCreate);

  useEffect(() => {
    //console.log(prev_loading);
    //console.log(props.isLoadingCreate);
    if (prev_loading && !props.isLoadingCreate) {
      if (props.CodeMsg === 1) {
        props.All();
        setShowModal(false);
        toast.success("Ajouté avec succès");
      }
      if (props.CodeMsg === 0) {
        toast.error("Problème lors de l'ajout !");
      }
    }
  }, [props.isLoadingCreate]);

  return (
    <>
      <Sidebar
        logo={{
          innerLink: "",
          imgSrc: "",
          imgAlt: "...",
        }}
      />

      <div className="main-content">
        <AdminNavbar />
        <Header />
        {/* Page content */}
        {props.isLoading ? (
          <div className="text-center my-3">
            <div id="loading"></div>
          </div>
        ) : (
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-1 mb-5 mb-xl-0">
                <div className="col">
                  <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto mb-2">
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Rechercher par titre"
                          type="text"
                          onChange={(event) => {
                            setSearch(event.target.value), setCurrentPage(1);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <Card className="shadow">
                    <CardHeader className="border-0 ">
                      <div className="d-flex justify-content-between">
                        <h3 className="mb-0">List des offres</h3>
                        {user.role === "admin" && (
                          <>
                            <Row>
                              <Button
                                size="sm"
                                onClick={() => setShowModal(true)}
                              >
                                <i className="fas fa-plus"></i> Offre
                              </Button>
                            </Row>
                          </>
                        )}
                      </div>
                    </CardHeader>

                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Titre</th>
                          <th scope="col">Prix Dt</th>
                          <th scope="col">Date début</th>
                          <th scope="col">Date fin</th>
                          <th scope="col">Catégories</th>
                          {user.role === "admin" && (
                            <th scope="col">Demandes</th>
                          )}
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {offresData.map((of, index) => {
                          return (
                            <Fragment key={index}>
                              <tr key={of._id}>
                                <td>{of.titre}</td>
                                <td>{of.prixdebut}</td>
                                <td>
                                  {of.dateDebut
                                    ? of.dateDebut.substring(0, 10)
                                    : ""}
                                </td>
                                <td>
                                  {of.dateFin
                                    ? of.dateFin.substring(0, 10)
                                    : ""}
                                </td>
                                <td>
                                  {of.category} - {of.souscategory}
                                </td>
                                {user.role === "admin" && (
                                  <td>
                                    {of.status !== "pending" &&
                                    of.status !== "archived"
                                      ? of.demandes.length
                                      : 0}
                                  </td>
                                )}

                                <td>
                                  {!of.archived &&
                                    DatetoCheck > new Date(of.dateDebut) &&
                                    DatetoCheck < new Date(of.dateFin) && (
                                      <span className=" text-success">
                                        Published
                                      </span>
                                    )}
                                  {DatetoCheck > new Date(of.dateFin) && (
                                    <span className=" text-dark">Closed</span>
                                  )}
                                  {DatetoCheck < new Date(of.dateDebut) &&
                                    !of.archived && (
                                      <span className=" text-warning">
                                        Pending
                                      </span>
                                    )}
                                  {of.archived && (
                                    <span className=" text-grey">Archived</span>
                                  )}
                                </td>
                                {/* DateToCheck > Debut && DateToCheck < Fin */}
                                {user.role === "admin" && (
                                  <td>
                                    <Button
                                      className="btn btn-outline-dark"
                                      size="sm"
                                      onClick={() => {
                                        setCurrentObj(of);
                                        setShowModal3(true);
                                      }}
                                    >
                                      <i className="fas fa-eye"></i>
                                    </Button>
                                    {DatetoCheck < new Date(of.dateDebut) &&
                                      of.archived && (
                                        <Button
                                          className="btn btn-outline-dark"
                                          size="sm"
                                          onClick={() => {
                                            setCurrentObj(of);
                                            setShowModal2(true);
                                          }}
                                        >
                                          <i className="fas fa-pencil-alt"></i>
                                        </Button>
                                      )}

                                    {DatetoCheck < new Date(of.dateDebut) ? (
                                      <>
                                        <Button
                                          className="btn btn-outline-danger"
                                          size="sm"
                                          onClick={() => onDLF(of._id)}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </Button>
                                      </>
                                    ) : (
                                      <Button
                                        disabled
                                        className="btn btn-dark"
                                        size="sm"
                                        onClick={() => onDLF(of._id)}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    )}
                                  </td>
                                )}
                                {user.role === "super-admin" && (
                                  <td>
                                    <Button
                                      className="btn btn-outline-dark"
                                      size="sm"
                                      onClick={() => {
                                        setCurrentObj(of);
                                        setShowModal3(true);
                                      }}
                                    >
                                      <i className="fas fa-eye"></i>
                                    </Button>

                                    {of.archived &&
                                      DatetoCheck > new Date(of.dateDebut) &&
                                      DatetoCheck < new Date(of.dateFin) && (
                                        <Button
                                          className="btn btn-outline-success"
                                          size="sm"
                                          onClick={() => onStatus(of._id)}
                                        >
                                          <i className="fas fa-arrow-up"></i>
                                        </Button>
                                      )}

                                    {of.status === "pending" &&
                                      DatetoCheck > new Date(of.dateDebut) &&
                                      DatetoCheck < new Date(of.dateFin) && (
                                        <Button
                                          className="btn btn-outline-dark"
                                          size="sm"
                                          onClick={() => {
                                            setCurrentObj(of);
                                            setShowModal4(true);
                                          }}
                                        >
                                          <i className="fas fa-pencil-alt"></i>
                                        </Button>
                                      )}

                                    {DatetoCheck < new Date(of.dateDebut) && (
                                      <>
                                        <Button
                                          className="btn btn-outline-danger"
                                          size="sm"
                                          onClick={() => onDLF(of._id)}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </Button>
                                      </>
                                    )}

                                    {!of.archived &&
                                      DatetoCheck > new Date(of.dateDebut) &&
                                      DatetoCheck < new Date(of.dateFin) && (
                                        <Button
                                          className="btn btn-outline-dark"
                                          size="sm"
                                          onClick={() => onStatus(of._id)}
                                        >
                                          <i className="fas fa-archive "></i>
                                        </Button>
                                      )}
                                  </td>
                                )}
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card>
                  {showModal3 || showModal2 || showModal || showModal4 ? (
                    <motion.div animate={{ opacity: 0 }}>
                      <PaginationComponent
                        total={pageNumber}
                        itemsPerPage={offresPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </motion.div>
                  ) : (
                    <PaginationComponent
                      total={pageNumber}
                      itemsPerPage={offresPerPage}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  )}
                </div>
              </Col>

              {/* Add Offre Modal-1 */}
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
                        <Offre
                          {...{
                            currentId,
                            setCurrentId,
                            showModal,
                            setShowModal,
                          }}
                          //AllOffres={props.All()}
                          create={props.create}
                        />
                      </motion.div>
                    </Col>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Update Offre  Modal-2 */}
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
                    <Col className=" fixed-top center" xl="5">
                      <motion.div className="" variants={modal}>
                        <UpdateOffre
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

              {/* Details Offre Modal-3 */}
              <AnimatePresence
                exitBeforeEnter
                showModal={showModal3}
                setShowModal={setShowModal3}
              >
                {showModal3 && (
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
                            showModal3,
                            setShowModal3,
                          }}
                        />
                      </motion.div>
                    </Col>
                  </motion.div>
                )}
              </AnimatePresence>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  isLoading: state.offres.loading,
  isAuth: state.auth.isAuthenticated,
  isLoadingCreate: state.offres.loading_create,
  CodeMsg: state.offres.codeMsg,
});

const mapActionToProps = {
  All: allOffres,
  create: addOffre,
};

export default connect(mapStateToProps, mapActionToProps)(OffreList);
