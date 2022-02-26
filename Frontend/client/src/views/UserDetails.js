// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { Redirect } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { loadUser, resend } from "redux/auth/authActions";
import { toast } from "react-toastify";
import axios from 'axios';

const UserDetails = (props) => {

  const [currentId, setCurrentId] = useState(0);
  const user = useSelector(state => state.auth.user);

  const userExist = localStorage.getItem("user");


  useEffect(() => { 
      props.GetUser()
    }, []);

    const verif = ()=> {

        try {
            
            props.ResendEmail()
            window.location.reload();
  
          } catch (error) {
              console.log(error)
              toast.error("Quelque chose s'est mal passé !")
          }   
      }


  if(!userExist){
    return <Redirect to='/login'/>;
  }

  return(
    <>

      <div className="main-content" >
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
        <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0">
            <Row className="mt-3">
                <Col xl='4'>
                <div className="text-center">
                <Card className="card-profile shadow">
                <CardHeader className="text-center border-0 pt-0 pt-md-2 pb-0 pb-md-2">
                    <div className="d-flex justify-content-between">
                    { user.active && (
                              <span className="text-success font-weight-700">Vérifié <i className="far fa-check-circle"></i></span>
                    )}

                    { !user.active && (
                      
                      <Button
                      className="my-4 btn-outline-danger"
                      color="default"
                      onClick={() => verif()}
                      size="sm"
                    >
                      Verifier votre e-mail
                    </Button>
                    )}
                        
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md">
                

                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-2">
                          
                          <div className="text-center">
                          <i className="fas fa-user-circle fa-4x text-red"></i>
                            <br/>
                        
                            <br></br>
                              <h3>
                                Nom: {user.nom} 
                              </h3>
                              <h3>
                                Prenom: {user.prenom}
                              </h3>
                              <h3>
                                Email: {user.email}
                              </h3>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                          { user.active && (
                            <Button
                            className="my-4 btn-outline-danger"
                            color="default"
                            //onClick={() => setCurrentId(user._id)}
                            size="xl"
                          >
                            Editer
                          </Button>
                          )}                     
                          </div>
                        </div>
                      </div>
                    
                    </Row>
                  
                  </CardBody>
                </Card>
                </div>
                </Col>
            </Row>
          </Col>
         

               
        </Row>
        </Container>
        </div>
      </div>                  
    </>
  );
};

const mapActionToProps = {
  GetUser: loadUser,
  ResendEmail: resend
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect ( mapStateToProps, mapActionToProps )(UserDetails);

/*
  { currentId !== 0 && (
                <div>
                  <Profile {...{ currentId, setCurrentId }} />
                </div>   
              )
            }
*/