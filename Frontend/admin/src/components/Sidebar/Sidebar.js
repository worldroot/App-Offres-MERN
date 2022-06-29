/*eslint-disable*/
// reactstrap components
import {
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const { bgColor, routes, logo } = props;
  const LogoImg = require("../../assets/img/oored.png");

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img alt={LogoImg} className="navbar-brand-img" src={LogoImg} />
          </NavbarBrand>
        ) : null}
        {/* User */}
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          {user.role === "admin" && (
            <NavItem className="pt-0 nav-link" to="/admin" tag={Link}>
              <i className="fas fa-tools text-red mr-2" />
              <span className="text-dark"> Dashboard</span>
            </NavItem>
          )}
          <br />
          {user.role === "super-admin" && (
            <NavItem className="pt-0 nav-link" to="/super-admin" tag={Link}>
              <i className="fas fa-tools text-red mr-2" />
              <span className="text-dark"> Dashboard</span>
            </NavItem>
          )}

          <NavItem className="pt-0 nav-link" to="/userslist" tag={Link}>
            <i className="fas fa-users text-red mr-2" />
            <span className="text-dark"> Utilisateurs</span>
          </NavItem>
          <br />
          <NavItem className="pt-0 nav-link " to="/categorieslist" tag={Link}>
            <i className="fas fa-archive text-red mr-2"></i>
            <span className="text-dark"> Categories</span>
          </NavItem>
          <br />
          <NavItem className="pt-0 nav-link" to="/offreslist" tag={Link}>
            <i className="fas fa-list-ul text-red mr-2"></i>
            <span className="text-dark"> Offres</span>
          </NavItem>
          <br />
          {user.role === "admin" && (
            <NavItem className="pt-0 nav-link" to="/demandes" tag={Link}>
              <i className="fas fa-flag text-red mr-2"></i>
              <span className="text-dark"> Demandes</span>
            </NavItem>
          )}

          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
