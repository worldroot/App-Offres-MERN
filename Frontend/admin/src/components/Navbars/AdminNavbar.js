
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

import { logout, refreshJwt } from "redux/auth/authActions";
import {connect, useDispatch} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import decode from 'jwt-decode'

import React, { useEffect, useState } from 'react';

const AdminNavbar = ({ logout }) => {

  const dispatch = useDispatch()
  let history = useHistory()
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

      useEffect(() => {

        const accessToken = localStorage.getItem("accessToken")
        if(accessToken){
          
          const refreshToken = localStorage.getItem("refreshToken")
          const decodedToken = decode(accessToken)

                if(decodedToken.exp * 1000 < new Date().getTime()){
                    
                    dispatch(refreshJwt({refreshToken}))
                  }
        }
      }, []);
    
  /*
  if(!user){
    toast.error("ERROR")
    return <Redirect to='/login'/>;
  }
  */
  //window.location.reload(true);
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
              <DropdownMenu className="dropdown-menu-arrow bg-white" right>

              { user.role === "admin" &&(
                  <DropdownItem to="/admin" className="bg-white" tag={Link}>
                    <i className="fas fa-tools" />
                    <span>Dashboard</span>
                  </DropdownItem>
              )} 

              { user.role === "super-admin" &&(
                  <DropdownItem to="/super-admin" className="bg-white" tag={Link}>
                    <i className="fas fa-tools"></i>
                    <span>Dashboard</span>
                  </DropdownItem>
              )} 

                 

                    

                    <DropdownItem divider />
                    <DropdownItem className="bg-white"
                    onClick={ ()=> {
                       logout(),
                       history.push('/login'),
                       toast.info('Utilisateur déconnecté ')
                       }}>
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

const mapToStateProps = (state) => ({

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