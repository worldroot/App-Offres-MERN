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
import OneSignal from "react-onesignal";
import { useState } from "react";

const AuthNavbar = ({ ...props }) => {
  let history = useHistory();
  const userExist = localStorage.getItem("user");
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [OneSignalID, setSignal] = useState("");
  OneSignal.getUserId((userId) => {
    setSignal(userId);
  });

  const LoggingOut = () => {
    dispatch(logout(OneSignalID)),
      setTimeout(() => {
        history.push("/login"), window.location.reload();
      }, 200);
  };

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container>
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
                    <img
                      className="img-fluid h-50 w-50"
                      alt="..."
                      src={ooredoo}
                    />
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
                        LoggingOut();
                      }}
                      tag={Link}
                    >
                      <i className="fas fa-sign-out-alt"></i>

                      <span className="nav-link-inner--text">
                        Se d??connecter
                      </span>
                    </NavLink>
                  </NavItem>
                </>
              )}

              {!userExist && (
                <NavItem>
                  <i className="fas fa-user-shield text-white"></i>
                  <span className="text-white h-25 w-25 mx-2 ">
                    Espace Administration
                  </span>
                </NavItem>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.notifications.notifications,
  isLoading: state.notifications.loading,
  CodeMsg: state.notifications.codeMsg,
});

const mapActionToProps = {
  //AllNotif: getUserNotif,
};

export default connect(mapStateToProps, mapActionToProps)(AuthNavbar);
