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

const LogoImg = require("../../assets/img/oo.png");
const ooredoo = require("../../assets/img/oored.png");
import { logout } from "redux/auth/authActions";
import { connect } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const AuthNavbar = ({ logout, isAuth, user }) => {
  let history = useHistory();
  const userExist = localStorage.getItem("user");
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={LogoImg} />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img className="img-fluid" alt="..." src={ooredoo} />
                  </Link>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {userExist && (
                <>
                  {userLocal.role === "admin" && (
                    <NavItem>
                      <NavLink to="/admin" className="nav-link-icon" tag={Link}>
                        <i className="fas fa-tools" />
                        <span className="nav-link-inner--text">Dashboard</span>
                      </NavLink>
                    </NavItem>
                  )}

                  {userLocal.role === "super-admin" && (
                    <NavItem>
                      <NavLink
                        to="/super-admin"
                        className="nav-link-icon"
                        tag={Link}
                      >
                        <i className="fas fa-tools"></i>
                        <span className="nav-link-inner--text">Dashboard</span>
                      </NavLink>
                    </NavItem>
                  )}

                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      to="/"
                      onClick={() => {
                        logout(),
                          history.push("/login"),
                          window.location.reload(false);
                      }}
                      tag={Link}
                    >
                      <i className="fas fa-sign-out-alt"></i>

                      <span className="nav-link-inner--text">
                        Se déconnecter
                      </span>
                    </NavLink>
                  </NavItem>
                </>
              )}

             {/*  {!userExist && (
                <NavItem>
                  <NavLink className="nav-link-icon" to="/login" tag={Link}>
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
              )} */}
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

export default connect(mapToStateProps, { logout })(AuthNavbar);
