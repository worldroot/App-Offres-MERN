import {
  Row,
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Col,
} from "reactstrap";

import Header from "../../components/Headers/Header.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { connect, useDispatch } from "react-redux";
import { getAllUsers } from "redux/users/userActions.js";
import { refreshJwt } from "redux/auth/authActions";
import { Fragment, useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import "components/modal.css";
import decode from 'jwt-decode'
import Banuser from "./banuser.js";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const UsersList = (props) => {

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  useEffect(() => {
    props.All();
  }, []);
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

  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);

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
                  <CardHeader className="border-0">
                    <h3 className="mb-0">List des utilisateurs</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Nom & Prenom</th>
                        <th scope="col">Role</th>
                        <th scope="col">Active</th>
                        <th scope="col">Banned</th>
                        {user.role === "super-admin" && (
                          <th scope="col">Action</th>
                        )}
                        {user.role === "admin" && <th scope="col"></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {user.role === "admin" && (
                        <>
                          {props.List.filter((user) => {
                            if (user.role === "user") {
                              return user;
                            }
                          }).map((user, index) => {
                            return (
                              <Fragment key={index}>
                                <tr key={user._id}>
                                  <td>{user.email}</td>
                                  <td>
                                    {user.nom} {user.prenom}
                                  </td>
                                  <td>{user.role}</td>

                                  <td>
                                    {user.active ? (
                                      <i className="far fa-check-circle text-success fa-2x"></i>
                                    ) : (
                                      <i className="fas fa-ban text-red fa-2x"></i>
                                    )}
                                  </td>
                                  <td>
                                    {user.banned ? (
                                      <span className="text-success">Oui</span>
                                    ) : (
                                      <span className="text-danger">Non</span>
                                    )}
                                  </td>
                                  <td>
                                    <div
                                      onClick={() => {
                                        setCurrentId(user._id);
                                        setShowModal(true);
                                      }}
                                    >
                                      <Button
                                        className="btn btn-outline-danger"
                                        size="sm"
                                      >
                                        {" "}
                                        Bannir{" "}
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </>
                      )}
                      {user.role === "super-admin" && (
                        <>
                          {props.List.filter((user) => {
                            if (user.role !== "super-admin") {
                              return user;
                            }
                          }).map((user, index) => {
                            return (
                              <Fragment key={index}>
                                <tr key={user._id}>
                                  <td>{user.email}</td>
                                  <td>
                                    {user.nom} {user.prenom}
                                  </td>
                                  <td>{user.role}</td>
                                  <td>
                                    {user.active ? (
                                      <i className="far fa-check-circle text-success fa-2x"></i>
                                    ) : (
                                      <i className="fas fa-ban text-red fa-2x"></i>
                                    )}
                                  </td>
                                  <td>
                                    {user.banned ? (
                                      <span className=" text-danger ">Oui</span>
                                    ) : (
                                      <span className=" text-success ">
                                        Non
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div
                                      onClick={() => {
                                        setCurrentId(user._id);
                                        setShowModal(true);
                                      }}
                                    >
                                      <Button
                                        className="btn btn-outline-danger"
                                        size="sm"
                                      >
                                        {" "}
                                        Bannir{" "}
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
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
                  <Col className="center" xl="3">
                    <motion.div className="" variants={modal}>
                      <Banuser
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
  List: state.users.uslist,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: getAllUsers,
};

export default connect(mapStateToProps, mapActionToProps)(UsersList);
