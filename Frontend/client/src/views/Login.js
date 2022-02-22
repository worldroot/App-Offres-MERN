import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
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
import { login } from "redux/auth/authActions"
import {toast} from 'react-toastify'

const Login = ({ login, isAuth, user }) => {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      toast.warn('Verifier vos champs !')
    }else{
      try {
        login({email,password});
      } catch (error) {
        console.log(error)
        toast.error('Error !')
      }
    }
  };

  const userExist = localStorage.getItem("user")


  


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
                    
              <Col className="order-xl-1 mt-2 mt-md-5 py-5 bg-red " xl="8">
                
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
                            <div className="small font-weight-bold text-white-50 mb-0 text-uppercase">Inscrivez-vous pour profiter de tous nos services</div>
                            <div className="h3 mb-0 text-white">Mon espace</div>
                          </div>
                        </Col>
                      </Row>
                 
                   <br></br>
                    <Form role="form" onSubmit={onSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={handleChange('email')}
                            value={email}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={handleChange('password')}
                            value={password}
                          />
                        </InputGroup>
                        <a
                          className="text-white"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </FormGroup>
                    
                      <div className="text-center">
                        <Button className="my-4 btn-outline-white" color="dark" type="submit">
                          Connecter
                        </Button>
                      </div>
                    </Form>
                  </Col>
                  {/* SIDE 2 */}
                  <Col className="text-right align-self-center" xl="4">
                      <div className=" mb-4 mb-xl-0 bg-white">
                     
                      </div>
                  </Col>
                </Row>
              </Col>

                  
              
            </Row>
            </Container>

            
            </>

          )}

          { userExist && (

          <Container classNameName="mt--8 pb-5">
          <Row classNameName="justify-content-center">
                  
            <h1 classNameName="text-center text-white">Déjà connecté</h1>
            
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

export default connect(mapToStateProps, { login }) (Login);