// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const LogoImg = require('../../assets/img/oo.png')
import { Link } from "react-router-dom";
import {connect} from 'react-redux'


const AuthNavbar = ({isAuth, user}) => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={LogoImg}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={ require("../../assets/img/brand/argon-react.png") }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
            { isAuth && (
                <NavItem>
                    <NavLink className="nav-link-icon" to="/" tag={Link}>
                      <i className="ni ni-planet" />
                      <span className="nav-link-inner--text">Dashboard</span>
                    </NavLink>
                  </NavItem>    
            )}
              
              { !isAuth && (
                <>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      to="/register"
                      tag={Link}
                    >
                      <i className="ni ni-circle-08"/>
                      <span className="nav-link-inner--text">Register</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/login" tag={Link}>
                      <i className="ni ni-key-25"/>
                      <span className="nav-link-inner--text">Login</span>
                    </NavLink>
                  </NavItem>
                </>
                 

              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapToStateProps)(AuthNavbar);
