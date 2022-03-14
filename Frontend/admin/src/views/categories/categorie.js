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
  import { Redirect } from 'react-router-dom'
  import { connect, useSelector, useDispatch } from 'react-redux';
  import React, { useState, useEffect } from "react";
 
  import {motion, AnimatePresence} from 'framer-motion'
  
  import { loadUser } from "redux/auth/authActions";
  
  const Categorie = (props) => {
  
    const [currentId, setCurrentId] = useState(0);
    const user = useSelector(state => state.auth.user);
  
    const userExist = localStorage.getItem("user");
  
  
    /*
    const [user] = useState(() => {
      const saved = localStorage.getItem("user");
      const initialValue = JSON.parse(saved);
      return initialValue || "";
      });
    */
  
  
    useEffect(() => { 
        props.GetUser()
      }, []);
  
    if(!userExist){
      return <Redirect to='/login'/>;
    }
  
    return(
      <>

              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-1" lg="2">
                    <div className="card-profile-image">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                       
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                   
                    <Button
                      className=" btn-outline-default"
                      color="default"
                      onClick={() => setCurrentId(user._id)}
                      size="sm"
                    >
                      <i class="fas fa-redo"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                        
                  </Row>
                
                </CardBody>
              </Card>
                 
      </>
    );
  };
  
  const mapActionToProps = {
    GetUser: loadUser
  };
  
  const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(Categorie);
  
  /*
    { currentId !== 0 && (
                  <div>
                    <Profile {...{ currentId, setCurrentId }} />
                  </div>   
                )
              }
  */