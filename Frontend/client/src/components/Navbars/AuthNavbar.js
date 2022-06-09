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
import { toast } from "react-toastify";
import { useState, useEffect, Fragment } from "react";
import decode from "jwt-decode";
import OneSignal from "react-onesignal";
import {
  getUserNotif,
  deleteNotif,
  updateSeen,
} from "redux/notif/notifActions";
import { logout } from "redux/auth/authActions";
import Badge from "@mui/material/Badge";
import Notification from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const AuthNavbar = ({ ...props }) => {
  let history = useHistory();
  const userExist = localStorage.getItem("user");
  const dispatch = useDispatch();
  const [user] = useState(() => {
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

  useEffect(() => {
    if (userExist) {
      props.AllNotif();
    }
  }, []);

  const [OneSignalID, setSignal] = useState("");
  OneSignal.getUserId((userId) => {
    setSignal(userId);
  });

  const LoggingOut = () => {
    dispatch(logout(OneSignalID)),
      history.push("/login"),
      window.location.reload();
  };

  const bs = {
    height: 30,
    width: 30,
  };

  const onDl = (id) => {
    dispatch(deleteNotif(id));
    window.location.reload(false)
  };

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
                      {props.List.length > 0 ? (
                        <Badge
                          badgeContent={props.List.length}
                          overlap="circular"
                          color="error"
                        >
                          <NotificationsActiveIcon
                            className="text-red text-xl-center"
                            style={bs}
                          />
                        </Badge>
                      ) : (
                        <Notification
                          className="text-red text-xl-center"
                          style={bs}
                        />
                      )}
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem disabled className="bg-white text-red">
                        <span className="mx-1">Notifications</span>
                      </DropdownItem>
                      {props.List.length > 0 ? (
                        props.List.map((n, index) => {
                          return (
                            <Fragment key={index}>
                              {n.seen ? (
                                <div className="">
                                  <DropdownItem header>
                                    <span className="text-gray">{n.title}</span>
                                    <Button
                                      className="mx-2 btn btn-outline-danger"
                                      size="sm"
                                      onClick={() => onDl(n._id)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  </DropdownItem>
                                  <DropdownItem disabled className="bg-white">
                                    <h5 className="text-gray">{n.text}</h5>
                                  </DropdownItem>
                                </div>
                              ) : (
                                <>
                                  <DropdownItem header>
                                    <span className="text-dark">{n.title}</span>
                                  </DropdownItem>
                                  <DropdownItem
                                    className="bg-white"
                                    onClick={() => {
                                      dispatch(updateSeen(n._id));
                                    }}
                                  >
                                    <h5 className="text-dark">{n.text}</h5>
                                  </DropdownItem>
                                </>
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
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                        <i className="fas fa-user-circle fa-2x text-red"></i>
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
                      <DropdownItem divider />
                      <DropdownItem
                        className="bg-white"
                        onClick={() => LoggingOut()}
                      >
                        <i className="fas fa-sign-out-alt text-red"></i>
                        <span>Se déconnecter</span>
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
                        Register
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/login" tag={Link}>
                      <i className="fas fa-sign-in-alt text-red"></i>
                      <span className="nav-link-inner--text text-red">
                        Login
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
});

const mapActionToProps = {
  AllNotif: getUserNotif,
};

export default connect(mapStateToProps, mapActionToProps)(AuthNavbar);
