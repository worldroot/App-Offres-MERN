import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import routes from "routes.js";

const SuperAdminIndex = ({user, isAuth}) => {

  if(!isAuth){
    return <Redirect to='/login'/>;
  }

  return (
    <>
    {/* Layout*/}
    <Sidebar
        routes={routes}
        logo={{
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />

      <div className="main-content" >
        
        <AdminNavbar/>

      {/* Page content */}
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Tableau de bord Super Admin 
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              
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

export default connect (mapToStateProps)(SuperAdminIndex);
