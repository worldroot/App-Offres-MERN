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
import { Redirect, useLocation } from 'react-router-dom';
import {connect} from 'react-redux';
import {toast} from 'react-toastify'
import routes from "routes.js";
import decode from 'jwt-decode'
import React, { useEffect } from 'react';
import { refreshJwt } from "redux/auth/authActions";


const AdminIndex = ({ refreshJwt }) => {

  const location = useLocation()
  const userExist = localStorage.getItem("user")
  if(!userExist){
    return <Redirect to='/login'/>;
  }

  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken")
    if(accessToken){
      

      const refreshToken = localStorage.getItem("refreshToken")
      /**
       *  const decodedToken = decode(accessToken)
          if(decodedToken.exp * 1000 < new Date().getTime()){
              refreshJwt({refreshToken})
            }
       */

      let minutes = 1000 * 60 * 40
      let interval =  setInterval(()=> {
          refreshJwt({refreshToken})
      }, minutes)

      return ()=> clearInterval(interval)
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem("accessToken") === null){
      return <Redirect to='/login'/>; 
    }
  }, [])

  return (
    <>
    {/* Layout*/}
    <Sidebar
        routes={routes}
        logo={{
          innerLink: "",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />

      <div className="main-content" >
        <AdminNavbar/>

        <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                   
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    
                   
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Admin tableau de bord</h3>
                    </Col>
                    
                  </Row>
                </CardHeader>
                <CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

      </div>
     
    </>
  );
};

const mapToStateProps = (state) => ({

});

export default connect(mapToStateProps, {refreshJwt})(AdminIndex);
