import {
  Row,
  Card,
  CardHeader,
  Table,
  Container,
  Col,
  Button,
} from "reactstrap";

import Header from "../../components/Headers/Header.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { connect, useDispatch } from "react-redux";
import { allOffres } from "redux/offres/offreActions";
import { getSousById } from "redux/cat/catActions";
import { Fragment, useEffect, useState } from "react";
import Offre from "./offre.js";

import { motion, AnimatePresence } from "framer-motion";
import "components/modal.css";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "50px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const OffreList = ({ ...props }) => {
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.All();
  }, []);

  const [showModal, setShowModal] = useState(false);

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
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="12">
              <div className="col">
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
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                        <th scope="col">Date début</th>
                        <th scope="col">Date fin</th>
                        <th scope="col">Catégories</th>
                        <th scope="col">Sous-catégories</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.List.map((of, index) => {
                        return (
                          <Fragment key={index}>
                            <tr key={of._id}>
                              <td>{of.titre}</td>
                              <td>{of.description}</td>
                              <td>
                                <img
                                  className=" img-fluid rounded shadow avatar avatar-lg"
                                  src={of.image}
                                  alt=""
                                />
                              </td>
                              <td>{of.dateDebut.substring(0, 10)}</td>
                              <td>{of.dateFin.substring(0, 10)}</td>
                              <td>{of.category}</td>
                              <td>{of.souscategory}</td>
                              <td>
                                {of.status === "pending" ? (
                                  <span className=" text-warning">Pending</span>
                                ) : (
                                  <span className="text-success">Published</span>
                                )}
                              </td>
                            </tr>
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>

            {/* Update Catégorie */}
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
