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
import React, { useEffect, useState } from "react";
import { refreshJwt } from "redux/auth/authActions";
import { allOffres } from "redux/offres/offreActions";

const AdminIndex = ({ ...props }) => {
  useEffect(() => {
    props.All();
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
          "#2ECDF3",
          "#FFA88E",
          "#898989",
          "#FFA300",
          "#2CD5C4",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

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
        <Container className="mt--5" fluid>
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
                <Card className="bg-white shadow w-100">
                  <CardBody>
                    <Row>
                      <Col>
                        {offresData.labels.length !== 0 && (
                          <BarChart chartData={offresData} />
                        )}
                      </Col>
                      <Col>
                        {offresData.labels.length !== 0 && (
                          <PieChart chartData={offresData} />
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="bg-white shadow w-100 mt-3">
                  <CardBody>
                    {offresData.labels.length !== 0 && (
                      <LineChart chartData={offresData} />
                    )}
                  </CardBody>
                </Card>
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
  isLoading: state.offres.loading,
  isAuth: state.auth.isAuthenticated,
  CodeMsg: state.offres.codeMsg,
});

const mapActionToProps = {
  All: allOffres,
};

export default connect(mapStateToProps, mapActionToProps)(AdminIndex);
