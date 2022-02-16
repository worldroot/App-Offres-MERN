import {
  Button,
  Card,
  CardHeader,
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

import React, { useState } from 'react';
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

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
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


  if (isAuth && user) {
    const { role } = user;
    toast.info(`Bienvenue ${role}`);
    if (role === "admin") return <Redirect to='/admin'/>;
    if (role === "super-admin") return <Redirect to='/super-admin'/>;
    //if (role === 1) return <Redirect to='/dashboard/'/>;
  }


  return (
    <>
        <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
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
          <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                        
                  <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-transparent pb-5">
                        <h1 className="text-center">Login</h1>

                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        
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
                          </FormGroup>
                        
                          <div className="text-center">
                            <Button className="my-4" color="default" type="submit">
                              Connecter
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                    <Row className="mt-3">
                      <Col xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </Col>
                      <Col className="text-right" xs="6">
                        
                        
                      </Col>
                    </Row>
                  </Col>
                  
                </Row>
          </Container>

        </div>   
        <AuthFooter />    
      </div>

    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapToStateProps, { login }) (Login);
