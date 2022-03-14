import {
    Row,
    Card,
    CardHeader,
    Table,
    Container,
    Col,
    Button
  } from "reactstrap";
  
  import Header from "../../components/Headers/Header.js";
  import AdminNavbar from "../../components/Navbars/AdminNavbar";
  import Sidebar from "../../components/Sidebar/Sidebar";
  import {connect} from 'react-redux';
  import { getAllUsers } from "redux/users/userActions.js";
  import { Fragment, useEffect, useState } from "react";
import Categorie from "./categorie.js";
  
  const CategoriesList = (props) => {

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
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="6">
                <div className="col">
                    <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">List des categories</h3>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Date de creation</th>
                            <th scope="col"> <i className="fas fa-edit"></i></th>
                            <th scope="col"> <i className="fas fa-trash"></i></th>
                            <th scope="col" />
                        </tr>
                        </thead>
                        <tbody>
                        { user.role === "super-admin" &&(
                        <>
                        {props.List.map((cat, index) => {
                            return (
                                <Fragment key={index}>           
                                    <tr key={cat._id}>
                                    <td>{cat.nomcat}</td>
                                    <td>{cat.createdAt.substring(0, 10)}</td>  
                                    <td>        
                                        <div onClick={() => setCurrentId(cat._id)}>
                                            <Button className="btn btn-outline-default" size="sm" >Editer </Button>
                                        </div> 
                                    </td> 
                                    <td>
                                        <div onClick={() => setCurrentId(cat._id)}>
                                            <Button className="btn btn-outline-danger" size="sm" >Supprimer </Button>
                                        </div> 
                                    </td>   
                                    </tr>
                                </Fragment>
                                );
                                })}
                        </>
                        )}
                        { user.role === "admin" &&(
                        <>
                        {props.List.map((cat, index) => {
                            return (
                                <Fragment key={index}>           
                                    <tr key={cat._id}>
                                    <td>{cat.nomcat}</td>
                                    <td>{cat.createdAt.substring(0, 10)}</td>     
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
            </Col>

            <Col className="order-xl-2" xl="6">
            { user.role === "super-admin" &&(
                <Categorie/>
            )}
                
            </Col>
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
  
  export default connect (mapStateToProps, mapActionToProps)(CategoriesList);