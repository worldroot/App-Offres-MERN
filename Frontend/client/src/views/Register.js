// reactstrap components
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
import { connect } from 'react-redux'
import { register } from "redux/auth/authActions"
import { Redirect, useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'

import '../components/Loading/loading.css'
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import OO from "../assets/img/ccwhite.png"
import ooredoo from "../assets/img/oo.png"

const Register = ({register, isAuth, isLoading, user}) => {
  
  const [data, setData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  })

  const { nom, prenom, email, password} = data

  /*
  const history = useHistory()
  setTimeout(() => {
    history.push('/login')
  }, 1000);
  */

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value })
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(!nom || !prenom || !email || !password){
      toast.warn('Verifier vos champs !')
    }else{
      try {
          register({nom, prenom, email, password})
          

        } catch (error) {
            console.log(error)
            toast.error('Error dans les champs !')
        }
      }    
    }
    
    if (isAuth && user) {
      const { role } = user;
      //toast.info(`Bienvenue ${role}`);
      if (role === "user") return <Redirect to='/login'/>;
      //if (role === 1) return <Redirect to='/dashboard/'/>;
    }

  return (
    <>
    <div className="main-content position-flex">
        <AuthNavbar />
        <div className="header bg-danger py-7 py-lg-8">
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
                          
                  <Col className="order-xl-1 mt-2 mt-md-3 py-5 bg-danger " xl="6">
                    
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
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                  <i className="fas fa-user"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                  placeholder="Nom" 
                                  type="text" 
                                  onChange={handleChange('nom')}
                                  value={nom}
                                  />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fas fa-user"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                  placeholder="Prenom" 
                                  type="text"
                                  onChange={handleChange('prenom')}
                                  value={prenom} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fas fa-envelope"></i>
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
                                      <i className="fas fa-lock"></i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="Mot de passe"
                                    type="password"
                                    onChange={handleChange('password')}
                                    value={password}
                                  />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <Button className="mt-4 btn-outline-white"  type="submit">
                                  S'inscrire
                                </Button>
                            </div>
                          </Form>

                      </Col>
                      {/* SIDE 2 */}
                      <Col className="align-self-center position-sticky" xl="4">  
                          <div className="md-2">
                              
                              <img
                                  className="img-fluid"
                                  alt="..."
                                  src={OO}
                                />
                                <img
                                  className="img-fluid"
                                  alt="..."
                                  src={ooredoo}
                                />
                            </div>   
                      </Col>
                    </Row>
                  </Col>

                </Row>
             </Container> 
    </div>
</div>
<AuthFooter/>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapToStateProps, { register })(Register);
