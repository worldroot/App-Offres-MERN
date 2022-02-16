
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Button,
  Toast
} from "reactstrap";

import { logout } from "redux/auth/authActions";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

const AdminNavbar = ({ logout ,user, isAuth }) => {

  if(!isAuth && !user){
    return <Redirect to='/login'/>;
  }
  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            
          </Link>
         
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                    <i className="fas fa-user-shield"></i>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.role}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                </DropdownItem>
                <DropdownItem to="/profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Profile</span>
                </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={ ()=> {
                      logout()
                    } }>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect (mapToStateProps, { logout } )(AdminNavbar);


/* Serach Bar

 <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
*/