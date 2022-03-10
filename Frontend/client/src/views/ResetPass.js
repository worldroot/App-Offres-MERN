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

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import {UsermsURL} from 'helpers/urls'
import setAuthToken from 'helpers/authToken';

import '../components/Loading/loading.css'
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import OO from "../assets/img/ccwhite.png"
import ooredoo from "../assets/img/oo.png"

const ResetPass = () => {
  
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  let history = useHistory();

  useEffect(() => {
		const verifyUrl = async () => {
			try {
        
				const url = `http://localhost:3000/reset-pass/${param.token}`;
				setValidUrl(true);

			} catch (error) {
				console.log(error);
        toast.error("Quelque chose s'est mal passé !")
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param]);
  
  const [data, setData] = useState({
    password: '',
    confirmpass: ''
  })

  const { password, confirmpass } = data

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value })
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    const config = { headers: { 'Content-Type': 'application/json', },};
    const body = JSON.stringify({ password, confirmpass });

    if(password !== confirmpass){
      toast.warn('Les mots de passe ne correspondent pas !')
    }else{
      try {

        setAuthToken(param.token)
        await axios.put(`${UsermsURL}/api/user/updatepwd`, body, config)
        toast.success("Mot de pass modifié avec succès")
        history.push('/login')
        
        } catch (error) {
            console.log(error)
            toast.error("Quelque chose s'est mal passé !")
        }
      }    
    }

  return (
    <>
    <div className="main-content">


    { !validUrl && (
            <>
              <div className="header bg-white py-7 py-lg-8"> 
                <PageNotFound/>
              </div> 
            </>
  
            )}


                      
    { validUrl && (
            <>
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
                          
                  <Col className="order-xl-1 mt-2 mt-md-8 py-5 bg-danger " xl="6">
                    
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
                                <div className="h3 mb-0 text-white">Nouveau mot de passe</div>
                                <div className="small font-weight-bold text-white-50 mb-0 text-uppercase">Indiquez votre nouveau mot de passe</div>
                              </div>
                            </Col>
                          </Row>
                    
                      <br></br>


                      <Form role="form" onSubmit={onSubmit}>
                           
                           
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                   <i className="fas fa-key"></i>                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Mot de passe"
                                  type="password"
                                  onChange={handleChange('password')}
                                  value={password}
                                />
                              </InputGroup>
                            </FormGroup>

                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fas fa-key"></i> 
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Confirmez le mot de passe"
                                  type="password"
                                  onChange={handleChange('confirmpass')}
                                  value={confirmpass}
                                />
                              </InputGroup>
                            </FormGroup>
                           
                           
                            <div className="text-center">
                                <Button className="mt-4 btn-outline-white"  type="submit">
                                  Réinitialiser
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
            </>
            )}
        
</div>
    </>
  );
};


export default ResetPass;
