import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import { Redirect, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import decode from "jwt-decode";
import { motion } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import { refreshJwt } from "redux/auth/authActions";
import { allOffres } from "redux/offres/offreActions";
import { allPub } from "redux/offres/offreActions";
import { allDems } from "redux/offres/offreActions";

const AdminIndex = ({ ...props }) => {
  useEffect(() => {
    props.All();
    props.AllPub();
    props.AllDems();
  }, []);

  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Redirect to="/login" />;
  }

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

  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [offresData, setOffresData] = useState({
    labels: props.List.map((data) => data.titre.substring(0, 18)),
    datasets: [
      {
        label: "Soumissions",
        data: props.List.map((data) => data.demandes.length),
        backgroundColor: [
          "#e27c7c",
          "#a86464",
          "#6d4b4b",
          "#503f3f",
          "#333333",
          "#3c4e4b",
          "#466964",
          "#599e94",
          "#6cd4c5",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (offresData.labels.length === 0) {
      props.All();
    }
  }, [offresData]);

  const img = {
    height: 200,
    width: 220,
  };

  return (
    <>
      {/* Layout*/}
      <Sidebar
        logo={{
          innerLink: "",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />

      <div className="main-content">
        <AdminNavbar />

        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            {props.isLoading ? (
              <Card className="bg-white shadow w-100">
                <CardBody>
                  <div className="text-center mt-7 mb-7">
                    <div id="loading"></div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <>
                <Row className="w-100">
                  <Col xl="9">
                    <Card className="bg-white shadow w-100">
                      <CardHeader>
                        <h3 className="text-dark">
                          Statistiques des soumissions par offre
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col>
                            <BarChart chartData={offresData} />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card className="bg-white shadow w-100 mt-3">
                      <CardHeader>
                        <h3 className="text-dark">
                          Les appels d'offres publiés
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <Row xs={1} md={3} className="g-4">
                          {props.ListPub.slice(0, 3).map((of, index) => {
                            return (
                              <Fragment key={index}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1.5 }}
                                >
                                  <Col>
                                    <Card className="m-2 cardStyle border-0">
                                      <CardBody className="text-dark border-0">
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
                                            Categorie: {of.category} -{" "}
                                            {of.souscategory}
                                          </small>
                                        </Row>

                                        <Row>
                                          <small className="text-danger">
                                            Date Debut:{" "}
                                            {of.dateDebut.substring(0, 10)}
                                          </small>
                                        </Row>
                                        <Row>
                                          <small className="text-danger">
                                            Date Limite:{" "}
                                            {of.dateFin.substring(0, 10)}
                                          </small>
                                        </Row>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </motion.div>
                              </Fragment>
                            );
                          })}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl="3">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <Row className="mb-2 justify-content-center w-100">
                        <Card className="bg-white shadow w-100">
                          <CardHeader className="  border-0">
                            <Row className="justify-content-center">
                              <Col>
                                <p className="text-red">Admin connecte</p>
                                <p className="text-dark">{userLocal.email}</p>
                                <p className="text-dark">
                                  {userLocal.nom} {userLocal.prenom}
                                </p>
                              </Col>
                            </Row>
                          </CardHeader>
                        </Card>
                      </Row>

                      <Row className="justify-content-center w-100 mt-2">
                        <Card className=" bg-gradient-info shadow w-100 border-0">
                          <CardBody>
                            <Row>
                              <Col lg="8">
                                <p className="text-white">
                                  Nombre total d'offres
                                </p>
                              </Col>
                              <Col lg="4">
                                <h1 className="text-white">
                                  {props.List.length}
                                </h1>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Row>
                      <Row className="justify-content-center w-100 mt-2">
                        <Card className="border-0 bg-gradient-success shadow w-100">
                          <CardBody>
                            <Row>
                              <Col lg="8">
                                <p className="text-white">
                                  Nombre d'offres publiés
                                </p>
                              </Col>
                              <Col lg="4">
                                <h1 className="text-white font-weight-bolder">
                                  {props.ListPub.length}
                                </h1>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Row>
                      <Row className="justify-content-center w-100 mt-2">
                        <Card className="border-0 bg-gradient-red shadow w-100">
                          <CardBody>
                            <Row>
                              <Col lg="8">
                                <p className="text-white">
                                  Nombre total de soumissions
                                </p>
                              </Col>
                              <Col lg="4">
                                <h1 className="text-white font-weight-bolder">
                                  {props.ListDems.length}
                                </h1>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Row>
                    </motion.div>
                  </Col>
                </Row>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListDems: state.offres.dems,
  ListPub: state.offres.offpubs,
  isLoading: state.offres.loading,
  isAuth: state.auth.isAuthenticated,
  CodeMsg: state.offres.codeMsg,
});

const mapActionToProps = {
  All: allOffres,
  AllPub: allPub,
  AllDems: allDems,
};

export default connect(mapStateToProps, mapActionToProps)(AdminIndex);
