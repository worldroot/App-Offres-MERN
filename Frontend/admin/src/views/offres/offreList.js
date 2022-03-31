import {
    Row,
    Card,
    CardHeader,
    Table,
    Container,
    Col,
    Button,
  } from "reactstrap";

  import Header from "../../components/Headers/Header.js";
  import AdminNavbar from "../../components/Navbars/AdminNavbar";
  import Sidebar from "../../components/Sidebar/Sidebar";
  import {connect, useDispatch} from 'react-redux';
  import { allOffres } from "redux/offres/offreActions";
  import { getSousById } from "redux/cat/catActions";
  import { Fragment, useEffect, useState } from "react";

  import { motion, AnimatePresence } from 'framer-motion';
  import 'components/modal.css'
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: "200px", 
      opacity: 1,
      transition: { delay: 0.5 }
    },
  }
  
  const OffreList = ({...props}) => {

        const [user] = useState(() => {
            const saved = localStorage.getItem("user");
            const initialValue = JSON.parse(saved);
            return initialValue || "";
        });
        const dispatch = useDispatch()
        const [currentId, setCurrentId] = useState(0);
        const [currentIdS2, setCurrentIdS2] = useState(0);

        const [currentIndex, setCurrentIndex] = useState(-1);
        const [currentIndex2, setCurrentIndex2] = useState(-1);

        useEffect(() => {
            props.All();
        }, []);

        const [showModal, setShowModal] = useState(false);
        const [showModal2, setShowModal2] = useState(false);
 
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
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="12">
                <div className="col">
                    <Card className="shadow">
                    <CardHeader className="border-0 ">
                        <div className="d-flex justify-content-between">
                        <h3 className="mb-0">List des offres</h3>
                        { user.role === "admin" &&(
                          <>
                            <Row>
                              <Button size="sm" onClick={() => setShowModal(true)}>
                                <i className="fas fa-plus"></i> Offre
                              </Button> 
                            </Row>
                          </>
                        )}
                        </div>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                                <th scope="col">Titre</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Date début</th>
                                <th scope="col">Date fin</th>
                                <th scope="col">Catégories</th>
                                <th scope="col">Status</th>
                           
                        </tr>
                        </thead>
                        <tbody>
                        {props.List.map((of, index) => {
                              return (
                                  <Fragment key={index}>           
                                      <tr key={of._id}>
                                        <td>{of.titre}</td>  
                                        <td>{of.description}</td>  
                                        <td>{of.image}</td>  
                                        <td>{of.dateDebut.substring(0, 10)}</td>  
                                        <td>{of.dateFin.substring(0, 10)}</td>  
                                        <td>{of.souscategory}</td>  
                                        <td>{of.status}</td>  
                                      </tr>
                                  </Fragment>
                                  );
                            })}
                        </tbody>
                    </Table>
                    </Card>
                </div>
            </Col>
          </Row>
          </Container>
        </div>
       
      </>
    );
  };
  
  const mapStateToProps = (state) => ({
    List: state.offres.offres,
    isAuth: state.auth.isAuthenticated,
  });
  
  const mapActionToProps = {
    All: allOffres,
  };
  
  export default connect (mapStateToProps, mapActionToProps)(OffreList);