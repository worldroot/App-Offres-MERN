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
import { allOffresDems } from "redux/offres/offreActions";
import { refreshJwt } from "redux/auth/authActions";
import { Fragment, useEffect, useState, useMemo } from "react";
import Offre from "./offre.js";

import { motion, AnimatePresence } from "framer-motion";
import "components/modal.css";
import UpdateOffre from "./updateOffre.js";
import DetailsOffre from "./detailsOffre.js";
import UpdateStatus from "./updateStatus.js";
import decode from "jwt-decode";
import "../../components/Loading/loading.css";
import DetailsDemande from "./detailsDemande.js";

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

const OffreListDemandes = ({ ...props }) => {
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
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showDemande, setShowDemande] = useState(false);

  const onDLF = (id) => {
    const onSuccess = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
    if (window.confirm("Êtes-vous sûr ?")) dispatch(deleteOffre(id, onSuccess));
  };

  var date = new Date();
  const DatetoCheck = new Date(date.getTime());
  const [Search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const Data = props.List;
  const offresPerPage = 5;

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

  return (
    <>
      {/* Layout*/}

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
                        <h3 className="mb-0">List des demandes</h3>
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
                          <th scope="col">Demandes</th>
                          <th scope="col">Date début</th>
                          <th scope="col">Date fin</th>
                          <th scope="col">Catégories</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {offresData.map((of, index) => {
                          return (
                            <Fragment key={index}>
                              <tr key={of._id}>
                                <td>{of.titre.substring(0, 12)}</td>
                                <td>{of.prixdebut}</td>
                                <td>( {of.demandes.length} )</td>
                                <td>{of.dateDebut.substring(0, 10)}</td>
                                <td>{of.dateFin.substring(0, 10)}</td>
                                <td>
                                  {of.category} - {of.souscategory}
                                </td>
                                <td>
                                  {of.status === "pending" && (
                                    <span className=" text-warning">
                                      Pending
                                    </span>
                                  )}
                                  {of.status === "archived" && (
                                    <span className=" text-gray">Archived</span>
                                  )}
                                  {of.status === "published" && (
                                    <span className=" text-success">
                                      Published
                                    </span>
                                  )}
                                  {of.status === "closed" && (
                                    <span className=" text-dark">Closed</span>
                                  )}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-outline-success"
                                    size="sm"
                                    onClick={() => {
                                      setCurrentObj(of);
                                      setShowModal3(true);
                                    }}
                                  >
                                    <i className="fas fa-eye"></i>
                                  </Button>
                                  {of.demandes.length !== 0 && (
                                    <Button
                                      className="btn btn-outline-dark"
                                      size="sm"
                                      onClick={() => {
                                        setCurrentObj(of);
                                        setShowDemande(true);
                                      }}
                                    >
                                      <i className="fas fa-sign-in-alt"></i>
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card>
                  <PaginationComponent
                    total={pageNumber}
                    itemsPerPage={offresPerPage}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </Col>

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

              {/* Details Demande */}
              <AnimatePresence
                exitBeforeEnter
                showModal={showDemande}
                setShowModal={setShowModal3}
              >
                {showDemande && (
                  <motion.div
                    className="backdrop"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Col className=" fixed-top center" xl="6">
                      <motion.div className="" variants={modal}>
                        <DetailsDemande
                          {...{
                            currentObj,
                            setCurrentObj,
                            showDemande,
                            setShowDemande,
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
  List: state.offres.offdems,
  isLoading: state.offres.loading,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: allOffresDems,
};

export default connect(mapStateToProps, mapActionToProps)(OffreListDemandes);
