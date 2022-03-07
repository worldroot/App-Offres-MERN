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
import UserHeader from "components/Headers/UserHeader.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import { Redirect } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import Profile from "./UpdateUser";
import {motion, AnimatePresence} from 'framer-motion'

import { loadUser } from "redux/auth/authActions";

const UserDetails = (props) => {

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
        {/* Layout*/}
        <Sidebar
        logo={{
          innerLink: "",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }} />

      <div className="main-content" >
        <AdminNavbar/>
        <UserHeader />

        <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-1" lg="2">
                  <div className="card-profile-image">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={ require("../assets/img/theme/react.jpg") }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                 
                  <Button
                    className="float-right"
                    color="default"
                    onClick={() => setCurrentId(user._id)}
                    size="sm"
                  >
                    Editer
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-3">
                      <div className="text-center">
                          <h3>
                            Nom: {user.nom} 
                          </h3>
                          <h3>
                            Prenom: {user.prenom}
                          </h3>
                          
                          <div>
                            <i className="ni education_hat mr-2" />
                            Email: {user.email}
                          </div>

                      </div>
                    </div>
                  </div>
                </Row>
              
              </CardBody>
            </Card>
          </Col>


          <Col className="order-xl-1" xl="8">
              <AnimatePresence>
                      { currentId !== 0 && (
                          <>
                          <motion.div
                              initial={{ y: '100vw' }}
                              animate={{ y: 0 }}
                              transition={{ type: 'spring', stiffness:100 }}
                              exit={{y: '100vw' }}>
                             <Profile {...{ currentId, setCurrentId }} />
                          </motion.div>
                          </>
                          )
                        }
              </AnimatePresence>
          </Col>

        </Row>
        </Container>
      </div>                  
    </>
  );
};

const mapActionToProps = {
  GetUser: loadUser
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
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