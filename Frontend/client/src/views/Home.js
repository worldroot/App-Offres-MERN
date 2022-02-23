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
    Container
  } from "reactstrap";
  
  import React, { useEffect, useState } from 'react';
  import AuthNavbar from "components/Navbars/AuthNavbar.js";
  import AuthFooter from "components/Footers/AuthFooter.js";
  
  import { Redirect } from 'react-router-dom'
  import {connect} from 'react-redux'
  import {toast} from 'react-toastify'

  import { refreshJwt } from "redux/auth/authActions";
  import decode from 'jwt-decode'
  
  const Home = ({ refreshJwt }) => {
  
  
    const userExist = localStorage.getItem("user")
  
    useEffect(() => {

      const accessToken = localStorage.getItem("accessToken")
      if(accessToken){
        
        
        const refreshToken = localStorage.getItem("refreshToken")
        const decodedToken = decode(accessToken)
        //console.log({refreshToken})
  
        if(decodedToken.exp * 1000 < new Date().getTime()){
  
            //localStorage.removeItem("accessToken")
            refreshJwt({refreshToken})
            
        }
  
      }else{
        //toast.error('Token Error')
        //window.location.reload();
        return <Redirect to='/login'/>; 
      }
    }, []);

    useEffect(() => {
      if(localStorage.getItem("accessToken") === null){
        return <Redirect to='/login'/>; 
      }
    }, [])
    
  
  
    return (
      <>
          <div className="main-content">
          <AuthNavbar />
          <div className="header bg-red py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    
                    <p className="text-lead text-light">
                    </p>
                  </Col>
                  
  
                  
                </Row>
              </div>
            </Container>
  
            {/* Content */}
            { !userExist && (
            <>
              <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                    <h1 className="text-center text-white" > Home </h1>
  
  
              </Row>
              </Container>
  
              
              </>
  
            )}
  
            { userExist && (
  
            <Container classeName="mt--8 pb-5">
            <Row className="justify-content-center">
                    
              <h1 className="text-center text-white">Bienvenue</h1>
              
            </Row>
            </Container>
            )}
  
          </div>   
          <AuthFooter />    
        </div>
  
      </>
    );
  };
  
  const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
  });
  
  export default connect(mapToStateProps, {refreshJwt} ) (Home);