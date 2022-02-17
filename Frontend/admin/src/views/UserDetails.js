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
import { connect } from 'react-redux';
import React, { useState } from "react";
import routes from "routes.js";
import Profile from "./UpdateUser";

const UserDetails = ({user, isAuth}) => {

  const [currentId, setCurrentId] = useState(0);
  if(!isAuth && !user){
    return <Redirect to='/login'/>;
  }

  return (
    <>
        {/* Layout*/}
        <Sidebar
        routes={routes}
        logo={{
          innerLink: "",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />

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
            className="mr-4"
            color="info"
            
            onClick={(e) => e.preventDefault()}
            size="sm"
          >
            Connect
          </Button>
          <Button
            className="float-right"
            color="default"
            
            onClick={(e) => e.preventDefault()}
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
                    {user.nom} {user.prenom}
                  </h3>
                  
                  <div>
                    <i className="ni education_hat mr-2" />
                    Email: {user.email}
                  </div>
                  
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Compte depuis: {user.createdAt.substring(0,10)}
                  </div>  
               </div>
            </div>
          </div>
        </Row>
       
      </CardBody>
    </Card>
  </Col>

  
  <Col className="order-xl-1" xl="8">
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">My account</h3>
          </Col>
          <Col className="text-right" xs="4">
            <Button
              color="default"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Confirmer
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form>
          <h6 className="heading-small text-muted mb-4">
            User information
          </h6>
          <div className="pl-lg-4">
          <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Nom
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" >
                    Prenom
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Username
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            
          </div>

        </Form>
      </CardBody>
    </Card>
  </Col>
</Row>
</Container>
      </div>                  
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapToStateProps)(UserDetails);




/*
  { currentId !== 0 && (
                <div>
                  <Profile {...{ currentId, setCurrentId }} />
                </div>   
              )
            }
*/