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
  import SousCategorie from "./sous-categorie.js";
  import Updatecategorie from "./updatecategorie.js";

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
  
  const CategoriesList = ({...props}) => {

    const [user] = useState(() => {
      const saved = localStorage.getItem("user");
      const initialValue = JSON.parse(saved);
      return initialValue || "";
    });
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(-1);

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
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="9">
                <div className="col">
                    <Card className="shadow">
                    <CardHeader className="border-0 ">
                        
                        <div className="d-flex justify-content-between">
                        <h3 className="mb-0">List des categories</h3>
                        { user.role === "super-admin" &&(
                          <>
                            <Row>
                            <Button size="sm" onClick={() => setShowModal(true)}>
                              <i className="fas fa-plus"></i> Catégorie
                            </Button> 
                            
                            </Row>
                           
                          </>
                         
                        )}
                        </div>
                       
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Categories & Sous-categories</th>
                            { user.role === "super-admin" &&(
                                <>
                                      <th scope="col">Actions</th>
                                      <th scope="col"></th>
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
                                      <td> { currentIndex === index ? (
                                                   <Updatecategorie {...{ currentId, setCurrentId, currentIndex, setCurrentIndex }} />
                                                ) : (
                                                  <>
                                                    <td className=" border-0"> {cat.nomcat}</td>
                                                    <td className=" border-0"> {cat.sous}</td>
                                                  </>
                                                   
                                                    
                                                )
                                            }   
                                      </td> 
                                   { currentId === 0 &&(
                                     <>
                                         <td>
                                          <Button
                                          className="btn-outline-dark" size="sm"
                                          onClick={() => {
                                            setCurrentId(cat._id);
                                            setCurrentIndex(index)} }
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

                                        <td>
                                          <div>
                                            <Button className="btn btn-outline-default" size="sm" onClick={() => setShowModal2(true)}>
                                              <i className="fas fa-plus"></i> Sous-Catégorie
                                            </Button>                                        
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
                                      <td>{cat.sous.sousnomcat}</td>  
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

            
            <AnimatePresence exitBeforeEnter showModal={showModal} setShowModal={setShowModal}>
              { showModal && (
                <motion.div className="backdrop"
                  variants={backdrop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                > 
                <Col className="center" xl="3">
                  <motion.div className="" variants={modal}>
                        
                      <Categorie {...{ currentId, setCurrentId, showModal, setShowModal }} />

                  </motion.div>
                </Col>
                  
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter showModal={showModal2} setShowModal={setShowModal2}>
              { showModal2 && (
                <motion.div className="backdrop"
                  variants={backdrop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                > 
                <Col className="center" xl="3">
                  <motion.div className="" variants={modal}>
                        
                      <SousCategorie {...{ currentId, setCurrentId, showModal2, setShowModal2 }} />

                  </motion.div>
                </Col>
                  
                </motion.div>
              )}
            </AnimatePresence>
              
          
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