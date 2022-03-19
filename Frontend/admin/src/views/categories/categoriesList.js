import {
    Row,
    Card,
    CardHeader,
    Table,
    Container,
    Col,
    Button,
  } from "reactstrap";
  
  import Accordion from '@mui/material/Accordion';
  import AccordionSummary from '@mui/material/AccordionSummary';
  import AccordionDetails from '@mui/material/AccordionDetails';
  import Typography from '@mui/material/Typography';
  import Header from "../../components/Headers/Header.js";
  import AdminNavbar from "../../components/Navbars/AdminNavbar";
  import Sidebar from "../../components/Sidebar/Sidebar";
  import {connect, useDispatch} from 'react-redux';
  import { getAllCat, deleteCat, getAllSousCat, deleteSousCat } from "redux/cat/catActions";
  import { Fragment, useEffect, useState } from "react";
  import Categorie from "./categorie.js";
  import SousCategorie from "./sous-categorie.js";
  import Updatecategorie from "./updatecategorie.js";
  import UpdateSousCategorie from "./updateSouscategorie.js";

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
    const [currentIdS2, setCurrentIdS2] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentIndex2, setCurrentIndex2] = useState(-1);

    useEffect(() => {
      props.All();
      props.AllSous();
    }, []);

    const onDLP = (id) => {
        const onSuccess = () => {
          window.location.reload();
        };
        if(window.confirm("Catégorie: Êtes-vous sûr de vouloir supprimer ?"))
          dispatch(deleteCat(id, onSuccess))
      };
    
    const onDeleteSous = (id) => {
        const onSuccess = () => {
          window.location.reload();
        };
        if(window.confirm("Sous-catégorie: Êtes-vous sûr de vouloir supprimer ?"))
          dispatch(deleteSousCat(id, onSuccess))
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
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="12">
                <div className="col">
                    <Card className="shadow">
                    <CardHeader className="border-0 ">
                        
                        <div className="d-flex justify-content-between">
                        <h3 className="mb-0">List des catégories</h3>
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
                            { user.role === "super-admin" &&(
                                <>
                                      <th scope="col">Catégories & Sous-catégories</th>
                                      <th scope="col">Actions</th>
                                      <th scope="col"></th>
                                      <th scope="col"></th>
                                </>
                            )}
                             { user.role === "admin" &&(
                                <>
                                      <th scope="col">Catégories</th>
                                      <th scope="col">Sous-atégories</th>   
                                </>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        { user.role === "super-admin" &&(
                        <>
                        {props.List.map((cat, index) => {
                            //console.log( )
                            return (
                                    <Fragment key={index}>

                                    <tr>     
                                      { currentIndex === index ? (  
                                                <Updatecategorie {...{ currentId, setCurrentId, currentIndex, setCurrentIndex }} />
                                                ) : (                                                 
                                                  <td className=""> 
                                                   
                                                    <Accordion className="shadow-none">
                                                     
                                                         <AccordionSummary 
                                                            aria-controls="panel1bh-content"
                                                            expandIcon={<i className="fas fa-angle-down fa-1x"></i>}>
                                                              <span className="mb-0 text-sm font-weight-bold">
                                                                {cat.nomcat}
                                                              </span>
                                                              <span className="mx-2 text-sm font-weight-bold text-gray">
                                                                ({cat.souscategorie.length})
                                                              </span>
                                                        </AccordionSummary>
                                                     
                                                        { cat.souscategorie.map(
                                                              ({sousnomcat, _id}, index2) => { 
                                                                return(
                                                                  <Fragment key={index2}> 
                                                                    { currentIndex2 === index2 ? (
                                                                        <UpdateSousCategorie {...{ currentIdS2, setCurrentIdS2, currentIndex2, setCurrentIndex2 }} />
                                                                      ) : (
                                                                     
                                                                          <AccordionDetails>
                                                                            <Row className="border-1 justify-content-between"> 
                                                                              <span className="my-2 text-gray">{sousnomcat}</span>
                                                                              <Typography> 
                                                                                  <Button className="mx-3 btn btn-danger" size="sm" onClick={() => onDeleteSous(_id)}>
                                                                                    <i className="fas fa-trash"></i>
                                                                                  </Button>
                                                                                  <Button className="btn btn-default" size="sm" 
                                                                                     onClick={() => {
                                                                                      setCurrentIdS2(_id)
                                                                                      setCurrentIndex2(index2)
                                                                                      }}>
                                                                                    <i className="fas fa-pencil-alt"></i>
                                                                                  </Button>
                                                                              </Typography>                                                                                                                                      
                                                                            </Row>  
                                                                          </AccordionDetails>                                        
                                                                     
                                                                      )}
                                                                              
                                                                  </Fragment>    
                                                              )}       
                                                            )}
                                                    </Accordion>
                                                    
                                                  </td> 
                                                )
                                            }   
                                     
                                   
                                        <td>
                                          <Button
                                          className="btn-outline-dark" size="sm"
                                          onClick={() => {
                                            setCurrentId(cat._id);
                                            setCurrentIndex(index)} }
                                          >
                                              Modifer
                                          </Button>
                                        </td>
                                        <td>
                                          <div onClick={() => onDLP(cat._id)}>
                                              <Button className="btn btn-outline-danger" size="sm"> Supprimer </Button>
                                          </div> 
                                        </td>  
                                        <td>
                                          <div>
                                            <Button className="btn btn-outline-default" size="sm" 
                                                    onClick={() => {setShowModal2(true); setCurrentId(cat._id)}}>
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

                        {/* List of Categories for **Admin**/}
                        { user.role === "admin" &&(
                          <>
                          {props.List.map((cat, index) => {
                              return (
                                  <Fragment key={index}>           
                                      <tr key={cat._id}>
                                        <td>{cat.nomcat}</td>  
                                        <td> { cat.souscategorie.map(
                                                          ({sousnomcat, _id}) => {
                                                              return(
                                                                <Fragment key={_id} >
                                                                  <div> 
                                                                    <span className="mx-1">{sousnomcat}</span>
                                                                  </div>  
                                                                </Fragment>  
                                                              )
                                                          }
                                                        )}
                                        </td>
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

            {/* Update Catégorie */}
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
            {/* Update Sous-Catégorie */}
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
    AllSous: getAllSousCat
  };
  
  export default connect (mapStateToProps, mapActionToProps)(CategoriesList);