// reactstrap components
import {
  UncontrolledCollapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
} from "reactstrap";

const ooredoo = require("../../assets/img/oored.png");
import { connect, useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import "../../components/Loading/loading.css";
import { useState, useEffect, Fragment, useMemo } from "react";
import decode from "jwt-decode";
import OneSignal from "react-onesignal";
import {
  getUserNotif,
  deleteNotif,
  updateSeen,
} from "redux/notif/notifActions";
import { logout } from "redux/auth/authActions";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const AuthNavbar = ({ ...props }) => {
  useEffect(() => {
    if (userExist) {
      props.AllNotif();
    }
  }, []);

  let history = useHistory();
  const userExist = localStorage.getItem("user");
  const dispatch = useDispatch();
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedRefToken = decode(refreshToken);

      if (decodedRefToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        return <Redirect to="/login" />;
      }
    }
  }, []);

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

  const bs = {
    height: 30,
    width: 30,
  };

  const onDL = (id) => {
    dispatch(deleteNotif(id));
    window.location.reload(false);
  };

  const onSeen = (id) => {
    dispatch(updateSeen(id));
  };

  const Data = props.List;

  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark bg-white fixed-top position-relative"
        expand="md"
      >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={ooredoo} />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <i className="fas fa-bars text-red"></i>
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/"
                  tag={Link}
                >
                  <i className="fas fa-home text-red "></i>
                  <span className=" text-red ">Acceuil</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/published-offres"
                  tag={Link}
                >
                  <i className="fab fa-buffer text-red "></i>
                  <span className=" text-red ">Offres</span>
                </NavLink>
              </NavItem>
              
              {userExist && (
                <Row>
                  <UncontrolledDropdown>
                    <DropdownToggle className="pr-0" nav>
                      {Data.length > 0 ? (
                        <Badge
                          badgeContent={Data.length}
                          overlap="circular"
                          color="error"
                        >
                          <NotificationsActiveIcon
                            className="text-red text-xl-center"
                            style={bs}
                          />
                        </Badge>
                      ) : (
                        <i className="far fa-bell text-red fa-2x"></i>
                      )}
                    </DropdownToggle>

                    <DropdownMenu className="dropdown-menu-arrow " right>
                      {props.isLoading ? (
                        <div className="text-center my-3">
                          <div id="small-loading"></div>
                        </div>
                      ) : (
                        <>
                          <DropdownItem disabled className="bg-white text-red">
                            <span>Notifications</span>
                          </DropdownItem>
                          {Data.length > 0 ? (
                            props.List.map((n, index) => {
                              return (
                                <Fragment key={index}>
                                  {n.seen ? (
                                    <div key={n._id}>
                                      <Row>
                                        <Col lg="10">
                                          <DropdownItem disabled>
                                            <span
                                              disabled
                                              className="text-gray"
                                            >
                                              {n.title}
                                            </span>
                                            <h5 className="text-gray">
                                              {n.text}
                                            </h5>
                                          </DropdownItem>
                                        </Col>
                                        <Col lg="2" className="text-center">
                                          <Button
                                            className="btn-outline-danger"
                                            size="sm"
                                            onClick={() => onDL(n._id)}
                                          >
                                            <i className="fas fa-trash"></i>
                                          </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : (
                                    <div key={n._id}>
                                      <DropdownItem
                                        className="bg-white"
                                        onClick={() => {
                                          onSeen(n._id);
                                        }}
                                      >
                                        <span className="text-dark">
                                          {n.title}
                                        </span>
                                        <h5 className="text-dark">{n.text}</h5>
                                        {!n.seen && (
                                          <small className="text-danger">
                                            Cliquer pour marquer comme lu
                                          </small>
                                        )}
                                      </DropdownItem>
                                    </div>
                                  )}
                                </Fragment>
                              );
                            })
                          ) : (
                            <>
                              <DropdownItem divider />
                              <DropdownItem
                                disabled
                                className="bg-white text-center"
                              >
                                <span className=" p-md-8">
                                  Aucune Notifications
                                </span>
                              </DropdownItem>
                            </>
                          )}
                        </>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                       
                        <i className="fas fa-user-circle fa-2x text-red"></i>
                        <span className="text-red">{userLocal.nom}</span>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        className="bg-white"
                        to="/profile"
                        tag={Link}
                      >
                        <i className="fas fa-user text-red" />
                        <span>Profile</span>
                      </DropdownItem>

                      <DropdownItem
                        className="bg-white"
                        onClick={() => LoggingOut()}
                      >
                        <i className="fas fa-sign-out-alt text-red"></i>
                        <span>Se d??connecter</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Row>
              )}

              {!userExist && (
                <>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      to="/register"
                      tag={Link}
                    >
                      <i className="fas fa-user-plus text-red" />
                      <span className="nav-link-inner--text text-red">
                        S'inscrire
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/login" tag={Link}>
                      <i className="fas fa-sign-in-alt text-red"></i>
                      <span className="nav-link-inner--text text-red">
                        Connexion
                      </span>
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

const mapStateToProps = (state) => ({
  List: state.notifications.notifications,
  isLoading: state.notifications.loading,
  CodeMsg: state.notifications.codeMsg,
});

const mapActionToProps = {
  AllNotif: getUserNotif,
};

export default connect(mapStateToProps, mapActionToProps)(AuthNavbar);
