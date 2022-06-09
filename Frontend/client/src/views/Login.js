import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  NavbarBrand,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from "reactstrap";

import React, { useEffect, useState } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import OO from "../assets/img/ccwhite.png";
import ooredoo from "../assets/img/oo.png";

import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "redux/auth/authActions";
import { toast } from "react-toastify";
import OneSignal from "react-onesignal";

const Login = ({ login, isAuth, user }) => {
  let history = useHistory();
  const style = { width: "200px" };
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;
  const [OneSignalID, setSignal] = useState("");

  OneSignal.getUserId((userId) => {
    //OneSignalID[0] = userId
    //OneSignalID.push(userId)
    setSignal(userId);
  });

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Verifier vos champs !");
    } else {
      try {
        login({ email, password, OneSignalID });
      } catch (error) {
        console.log(error);
        toast.error("Error !");
      }
    }
  };

  const userExist = localStorage.getItem("user");

  if (isAuth && user) {
    const { role } = user;
    if (role === "user") return <Redirect to="/home" />;
  }

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="bg-danger py-7 py-lg-9 w-100vh h-100vh">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <p className="text-lead text-light"></p>
                </Col>
              </Row>
            </div>
          </Container>

          {/* Content */}
          {!userExist && (
            <>
              <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                  <Col className="order-xl-1 bg-danger" xl="8">
                    <Row className="mt-3">
                      {/* SIDE 1 */}
                      <Col xl="8">
                        <Row className="mt-3">
                          <Col xl="2">
                            <div className="display-flex flex-items-center padding-xl">
                              <i className="fas fa-user fa-fw fa-3x text-white"></i>
                            </div>
                          </Col>
                          <Col xl="8">
                            <div className="flex-grow-1">
                              <div className="small font-weight-bold text-white-50 mb-0 text-uppercase">
                                Inscrivez-vous pour profiter de tous nos
                                services
                              </div>
                              <div className="h3 mb-0 text-white">
                                Mon espace
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <br></br>
                        <Form role="form" onSubmit={onSubmit}>
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fas fa-envelope"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Email"
                                type="email"
                                onChange={handleChange("email")}
                                value={email}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fas fa-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Mot de passe"
                                type="password"
                                onChange={handleChange("password")}
                                value={password}
                              />
                            </InputGroup>
                            <a
                              disabled
                              className=" text-white"
                              onClick={() => history.push("/forgot-pass")}
                              href=""
                            >
                              <small>Mot de passe oublié ?</small>
                            </a>
                           
                            
                          </FormGroup>

                          <div className="text-center">
                            <Col>
                              <Button
                                className="my-4 btn-outline-white"
                                type="submit"
                              >
                                Connecter
                              </Button>
                              <Button
                                className="my-4 btn-outline-white"
                                onClick={() => history.push("/register")}
                              >
                                Créer un compte
                              </Button>
                              
                            </Col>
                          </div>
                        </Form>
                      </Col>
                      {/* SIDE 2 */}
                      <Col className="align-self-center sticky" xl="4">
                        <div className="md-2">
                          <img
                            className="img-fluid"
                            style={style}
                            alt="..."
                            src={OO}
                          />
                          <img
                            className="img-fluid"
                            style={style}
                            alt="..."
                            src={ooredoo}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </>
          )}

          {userExist && (
            <Container classeName="mt--8 pb-5">
              <Row className="justify-content-center">
                <h1 className="text-center text-white">Déjà connecté</h1>
              </Row>
            </Container>
          )}
        </div>
      </div>
      <div className=" fixed-bottom">
        <AuthFooter />
      </div>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapToStateProps, { login })(Login);
