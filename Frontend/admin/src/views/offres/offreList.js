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
import { connect, useDispatch } from "react-redux";
import { allOffres, deleteOffre } from "redux/offres/offreActions";
import { refreshJwt } from "redux/auth/authActions";
import { Fragment, useEffect, useState } from "react";
import Offre from "./offre.js";

import { motion, AnimatePresence } from "framer-motion";
import "components/modal.css";
import UpdateOffre from "./updateOffre.js";
import DetailsOffre from "./detailsOffre.js";
import UpdateStatus from "./updateStatus.js";
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

const OffreList = ({ ...props }) => {
  const dispatch = useDispatch();
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

  const [Search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(0);
  const [currentObj, setCurrentObj] = useState({});

  useEffect(() => {
    props.All();
  }, []);

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

  var date = new Date();
  const DatetoCheck = new Date(date.getTime());
  const Today = date.toISOString().substring(0, 10);

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
                          setSearch(event.target.value);
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

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Description</th>
                        <th scope="col">Img</th>
                        <th scope="col">Date début</th>
                        <th scope="col">Date fin</th>
                        <th scope="col">Catégories</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {props.List.filter((of) => {
                        if (Search === "") {
                          return of;
                        } else if (
                          of.titre
                            .toLowerCase()
                            .includes(Search.toLocaleLowerCase())
                        ) {
                          return of;
                        }
                      }).map((of, index) => {
                        return (
                          <Fragment key={index}>
                            <tr key={of._id}>
                              <td>{of.titre.substring(0, 12)}</td>
                              <td>{of.prixdebut} dt</td>
                              <td>{of.description.substring(0, 10)}...</td>
                              <td>( {of.image.length} )</td>
                              <td>{of.dateDebut.substring(0, 10)}</td>
                              <td>{of.dateFin.substring(0, 10)}</td>
                              <td>
                                {of.category} - {of.souscategory}
                              </td>
                              <td>
                                {of.status === "pending" && (
                                  <span className=" text-warning">Pending</span>
                                )}
                                {of.status === "archived" && (
                                  <span className=" text-dark">Archived</span>
                                )}
                                {of.status === "published" && (
                                  <span className=" text-success">
                                    Published
                                  </span>
                                )}
                              </td>
                              {/* DateToCheck > Debut && DateToCheck < Fin */}
                              {user.role === "admin" && (
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

                                  {DatetoCheck > new Date(of.dateDebut) ? (
                                    <>
                                      <Button
                                        disabled
                                        className="btn btn-dark"
                                        size="sm"
                                        onClick={() => {
                                          setCurrentObj(of);
                                          setShowModal2(true);
                                        }}
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                      </Button>
                                      <Button
                                        disabled
                                        className="btn btn-danger"
                                        size="sm"
                                        onClick={() => onDLF(of._id)}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </>
                                  ) : (
                                    <>
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
                                      <Button
                                        className="btn btn-outline-danger"
                                        size="sm"
                                        onClick={() => onDLF(of._id)}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </>
                                  )}
                                </td>
                              )}

                              {user.role === "super-admin" && (
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

                                  {of.status === "archived" &&
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

                                  {of.status !== "archived" &&
                                    DatetoCheck > new Date(of.dateDebut) &&
                                    DatetoCheck < new Date(of.dateFin) && (
                                      <Button
                                        className="btn btn-outline-dark"
                                        size="sm"
                                        onClick={() => onDLF(of._id)}
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

            {/* Update Status Modal-4 */}
            <AnimatePresence
              exitBeforeEnter
              showModal={showModal4}
              setShowModal={setShowModal4}
            >
              {showModal4 && (
                <motion.div
                  className="backdrop"
                  variants={backdrop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Col className=" fixed-top center" xl="5">
                    <motion.div className="" variants={modal}>
                      <UpdateStatus
                        {...{
                          currentObj,
                          setCurrentObj,
                          showModal4,
                          setShowModal4,
                        }}
                      />
                    </motion.div>
                  </Col>
                </motion.div>
              )}
            </AnimatePresence>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: allOffres,
};

export default connect(mapStateToProps, mapActionToProps)(OffreList);
