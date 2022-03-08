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
import { forgotPass } from "redux/auth/authActions"
import { Redirect, useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'

import '../components/Loading/loading.css'
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import OO from "../assets/img/ccwhite.png"
import ooredoo from "../assets/img/oo.png"

const Register = ({forgotPass, isAuth, isLoading, user}) => {
  
  const history = useHistory()
  const [data, setData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  })

  const { email } = data

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
    if(!email){
      toast.warn('Verifier votre email !')
    }else{
      try {
          forgotPass({email})
          
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
    <div className="main-content">
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
                          
                  <Col className="order-xl-1 mt-2 mt-md-5 py-3 bg-danger " xl="6">
                    
                    <Row className="mt-3">
                      {/* SIDE 1 */}
                      <Col xl="8">
                          <Row className="mt-3">
                            <Col xl="2">
                              <div className="display-flex flex-items-center padding-xl">
                                <i className="fas fa-unlock-alt fa-fw fa-3x text-white"></i>
                              </div>
                            </Col>
                            <Col xl="8">
                              <div className="flex-grow-1">
                                <div className="h3 mb-0 text-white">Mot de passe oublié</div>
                                <div className="small font-weight-bold text-white-50 mb-0 text-uppercase">Indiquez l'adresse e-mail pour réinitialiser un nouveau mot de passe</div>
                              </div>
                            </Col>
                          </Row>
                    
                      <br></br>


                      <Form role="form" onSubmit={onSubmit}>
                           
                           
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
                           
                           
                            <div className="text-center">
                                <Button className="mt-4 btn-outline-white"
                                  onClick={ ()=> { history.push('/login') }}>
                                  Retour
                                </Button>
                                <Button className="mt-4 btn-outline-white"  type="submit">
                                  Envoyer
                                </Button>
                            </div>
                            
                          </Form>

                      </Col>
                      {/* SIDE 2 */}
                      <Col className="align-self-center" xl="4">  
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
    <AuthFooter />
</div>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapToStateProps, { forgotPass })(Register);
