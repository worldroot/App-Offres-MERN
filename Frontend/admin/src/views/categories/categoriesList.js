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
  import {connect, useDispatch} from 'react-redux';
  import { getAllCat, deleteCat, updateCat } from "redux/cat/catActions";
  import { Fragment, useEffect, useState } from "react";
  import Categorie from "./categorie.js";
import Updatecategorie from "./updatecategorie.js";
  
  const CategoriesList = ({...props}) => {

    const [user] = useState(() => {
      const saved = localStorage.getItem("user");
      const initialValue = JSON.parse(saved);
      return initialValue || "";
    });
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0);
    useEffect(() => {
      props.All();
    }, []);

    const onDLP = (id) => {
        const onSuccess = () => {
          window.location.reload();
        };
        if(window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
          dispatch(deleteCat(id, onSuccess))
      };

    

    
  
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
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="8">
                <div className="col">
                    <Card className="shadow">
                    <CardHeader className="border-0 ">
                        
                        <div className="d-flex justify-content-between">
                        <h3 className="mb-0">List des categories</h3>
                        { user.role === "super-admin" &&(
                          <>
                            <Button size="sm">
                              <i className="fas fa-plus"></i>
                            </Button> 
                          </>
                         
                        )}
                        </div>
                       
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Titre</th>
                            { user.role === "super-admin" &&(
                                <>
                                      <th scope="col">Actions</th>
                                      <th scope="col"></th>
                                </>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        { user.role === "super-admin" &&(
                        <>
                        {props.List.map((cat, index) => {
                            return (
                                    <Fragment key={index}>

                                    <tr key={cat.id}>     
                                      <td> { currentId !== 0 ? (
                                                  <Updatecategorie {...{ currentId, setCurrentId }} />
                                                ) : (
                                                    cat.nomcat
                                                )
                                            }   
                                      </td> 
                                   { currentId === 0 &&(
                                     <>
                                         <td>
                                          <Button
                                          className="btn-outline-dark" size="sm"
                                          onClick={() => setCurrentId(cat._id)}
                                          >
                                              Edit
                                          </Button>
                                        </td>
                                       
                                     </>
                                       
                                     )}

                                        <td>
                                        <div onClick={() => onDLP(cat._id)}>
                                            <Button className="btn btn-outline-danger" size="sm"> Supprimer </Button>
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

            <Col className="order-xl-2" xl="4">
            { user.role === "super-admin" &&(
                <Categorie {...{ currentId, setCurrentId }} />
            )}
                
            </Col>
          </Row>
          </Container>
        </div>
       
      </>
    );
  };
  
  const mapStateToProps = (state) => ({
    List: state.categories.categories,
    isAuth: state.auth.isAuthenticated,
  });
  
  const mapActionToProps = {
    All: getAllCat,
  };
  
  export default connect (mapStateToProps, mapActionToProps)(CategoriesList);