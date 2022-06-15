// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Button,
  Toast,
  Row,
  Col
} from "reactstrap";

import { logout, refreshJwt } from "redux/auth/authActions";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import decode from "jwt-decode";
import React, { Fragment, useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import {
  getUserNotif,
  deleteNotif,
  updateSeen,
} from "redux/notif/notifActions";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Notifications from "@mui/icons-material/Notifications";

const AdminNavbar = ({ ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    props.AllNotif();
  }, []);

  let history = useHistory();
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const Data = props.List;

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


  const onDL = (id) => {
    dispatch(deleteNotif(id));
    window.location.reload(false);
  };

  const onSeen = (id) => {
    dispatch(updateSeen(id));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = decode(accessToken);
      const decodedRefToken = decode(refreshToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(refreshJwt({ refreshToken }));
      }

      if (decodedRefToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        //history.push('/login')
        return <Redirect to="/login" />;
      }
    }
  }, []);

  const bs = {
    height: 23,
    width: 23,
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          ></Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown>
              <DropdownToggle className="pr-0" nav>
                {Data.length > 0 ? (
                  <Badge
                    badgeContent={Data.length}
                    overlap="circular"
                    color="primary"
                  >
                    <NotificationsActiveIcon
                      className="text-white text-xl-center"
                      style={bs}
                    />
                  </Badge>
                ) : (
                  <Notifications
                      className="text-white text-xl-center"
                      style={bs}
                    />
                )}
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-arrow" right>
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
                                      <span disabled className="text-gray">
                                        {n.title}
                                      </span>
                                      <h5 className="text-gray">{n.text} <br></br></h5>
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
                                  <span className="text-dark">{n.title}</span>
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
                        <DropdownItem disabled className="bg-white text-center">
                          <span className=" p-md-8">Aucune Notifications</span>
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
                  <i className="fas fa-user-shield"></i>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.role === "admin" ? (
                        <span>Admin</span>
                      ) : (
                        <span>Super-admin</span>
                      )}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow bg-white" right>
                <DropdownItem disabled className="bg-white">
                  <span className="text-red">{user.email}</span>
                </DropdownItem>
                <DropdownItem divider />
                {user.role === "admin" && (
                  <DropdownItem to="/admin" className="bg-white" tag={Link}>
                    <i className="fas fa-tools" />
                    <span>Dashboard</span>
                  </DropdownItem>
                )}

                {user.role === "super-admin" && (
                  <DropdownItem
                    to="/super-admin"
                    className="bg-white"
                    tag={Link}
                  >
                    <i className="fas fa-tools"></i>
                    <span>Dashboard</span>
                  </DropdownItem>
                )}

                <DropdownItem
                  className="bg-white"
                  onClick={() => {
                    LoggingOut();
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Se déconnecter</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

const mapActionToProps = {
  AllNotif: getUserNotif,
};

const mapStateToProps = (state) => ({
  List: state.notifications.notifications,
  isLoading: state.notifications.loading,
});

export default connect(mapStateToProps, mapActionToProps)(AdminNavbar);
