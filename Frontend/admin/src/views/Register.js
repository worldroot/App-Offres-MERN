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
                      <h1 className="text-center">Inscription</h1>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      
                      <Form role="form" onSubmit={onSubmit}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
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
                                <i className="ni ni-single-02" />
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
                        <div className="text-muted font-italic">
                          <small>
                            password strength:{" "}
                            <span className="text-success font-weight-700">strong</span>
                          </small>
                        </div>
                        <br></br>
                        <div className="text-center">
                        {isLoading && <div id='loading' className='my-12 border-b text-center' />}
                          {!isLoading && (
                            <Button className="mt-4" color="default" type="submit">
                              S'inscrire
                            </Button>
                          )}
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
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

export default connect(mapToStateProps, { register })(Register);
