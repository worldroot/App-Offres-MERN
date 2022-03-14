import {
    Row,
    Badge,
    Card,
    CardHeader,
    Table,
    Container,
  } from "reactstrap";
  
  import Header from "../../components/Headers/Header.js";
  import AdminNavbar from "../../components/Navbars/AdminNavbar";
  import Sidebar from "../../components/Sidebar/Sidebar";
  import { Redirect } from 'react-router-dom';
  import {connect} from 'react-redux';
  import {toast} from 'react-toastify'
  import { getAllUsers } from "redux/users/userActions.js";
  import { Fragment, useEffect, useState } from "react";
  
  const UsersList = (props) => {

    const [user] = useState(() => {
      const saved = localStorage.getItem("user");
      const initialValue = JSON.parse(saved);
      return initialValue || "";
    });

    useEffect(() => {
      props.All();
    }, []);
  
    return (
      <>
      {/* Layout*/}
      <Sidebar
          logo={{
            innerLink: "",
            imgSrc: '',
            imgAlt: "...",
          }}
        />
  
        <div className="main-content" >
          <AdminNavbar/>
  
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
          <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">List des utilisateurs</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Nom & Prenom</th>
                    <th scope="col">Role</th>
                    <th scope="col">Active</th>
                    <th scope="col">Banned</th>
                    <th scope="col">Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                { user.role === "admin" &&(
                  <>
                  {props.List.filter((user) => {
                    if(user.role === "user"){
                        return user
                    }
                }).map((user, index) => {
                  
                      return (
                        <Fragment key={index}>           
                            <tr key={user._id}>
                              <td>{user.email}</td>
                              <td>{user.nom} </td>
                              <td>{user.role}</td>
                              <td>{user.active.toString()}</td>
                              <td>{user.banned.toString()}</td>
                              <td>{user.prenom}</td>
                            </tr>
                          </Fragment>
                          );
                        })}
                  </>
                )}
                { user.role === "super-admin" &&(
                  <>
                  {props.List.map((user, index) => {

                      return (
                        <Fragment key={index}>           
                            <tr key={user._id}>
                              <td>{user.email}</td>
                              <td>{user.nom} {user.prenom}</td>
                              <td>{user.role}</td>
                              <td>{user.active ? <i className="far fa-check-circle text-success fa-2x"></i> : <i className="fas fa-ban text-red fa-2x"></i>}</td>
                              <td>{user.banned ? 'Oui' : 'Non'}</td> 
                              <td></td>       
                            </tr>
                          </Fragment>
                          );
                        })}
                  </>
                )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
</Container>
        </div>
       
      </>
    );
  };
  
  const mapStateToProps = (state) => ({
    List: state.users.uslist,
    isAuth: state.auth.isAuthenticated,
  });
  
  const mapActionToProps = {
    All: getAllUsers
  };
  
  export default connect (mapStateToProps, mapActionToProps)(UsersList);