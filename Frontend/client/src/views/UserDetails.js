// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { Redirect } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { loadUser, resend, refreshJwt } from "redux/auth/authActions";
import { toast } from "react-toastify";
import UpdateUserDetails from "./UpdateUser";
import { motion, AnimatePresence } from "framer-motion";
import decode from "jwt-decode";
import DemandesByUser from "./offres/DemandesByUser";

const UserDetails = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const userExist = localStorage.getItem("user");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = decode(accessToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(refreshJwt({ refreshToken }));
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    props.GetUser();
  }, []);

  const [currentId, setCurrentId] = useState(0);
  const [Show, setShow] = useState(false);

  const verif = () => {
    props.ResendEmail();
    window.location.reload();
  };

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="main-content flex">
        <AuthNavbar />
        <div className="bg-danger w-100vh h-100vh py-5">
          <Container>
            <Row>
              <Col className="order-xl-1 mb-5 mb-xl-0 " xl="4">
                <div className="text-center">
                  <Card className="card-profile shadow">
                    <CardHeader className="text-center border-0 pt-0 pt-md-2 pb-0 pb-md-2">
                      <div className=" justify-content-between">
                        {userLocal.active && (
                          <span className=" text-success font-weight-700">
                            V??rifi?? <i className="far fa-check-circle"></i>
                          </span>
                        )}

                        {!userLocal.active && (
                          <Button
                            className="my-4 btn-outline-danger"
                            color="default"
                            onClick={() => verif()}
                            size="sm"
                          >
                            Verifier votre e-mail
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0 pt-md">
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center mt-md-2">
                            <div className="text-center">
                              <i className="fas fa-user-circle fa-4x text-red"></i>
                              <hr className="my-4" />
                              <h3>
                                {user.nom} {user.prenom}{" "}
                              </h3>
                              <h3> {user.email} </h3>
                            </div>
                          </div>
                          {userLocal.active && (
                            <>
                              <div className="text-center">
                                <Button
                                  className="my-2 btn-outline-dark"
                                  color="default"
                                  onClick={() => {
                                    setCurrentId(userLocal._id), setShow(false);
                                  }}
                                  size="sm"
                                >
                                  Editer compte
                                </Button>
                               {/*  <Button
                                  className="my-2 btn-outline-dark"
                                  color="default"
                                  onClick={() => {
                                    setCurrentId(0), setShow(true);
                                  }}
                                  size="sm"
                                >
                                  Traiter demandes
                                </Button> */}
                              </div>
                            </>
                          )}
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col className="order-xl-2" xl="8">
                <AnimatePresence>
                  {currentId !== 0 && (
                    <>
                      <motion.div
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        exit={{ x: "100vw" }}
                      >
                        <UpdateUserDetails {...{ currentId, setCurrentId }} />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {Show && (
                    <>
                      <motion.div
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        exit={{ opacity: 0 }}
                      >
                        <DemandesByUser {...{ Show, setShow }} />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <AuthFooter />
    </>
  );
};

const mapActionToProps = {
  GetUser: loadUser,
  ResendEmail: resend,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapActionToProps)(UserDetails);
