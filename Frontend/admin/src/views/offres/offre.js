// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  // core components
  import { Redirect } from 'react-router-dom'
  import { connect, useDispatch } from 'react-redux';
  import {toast} from 'react-toastify'
  import React, { useState, useEffect } from "react";
  import { addOffre } from "redux/offres/offreActions";
  import { getAllSousCat } from "redux/cat/catActions";
  import useForm from "helpers/useForm";
  import Modal from "components/ModalBox";
  import FileBase64 from 'react-file-base64';
  import { Select, MenuItem, FormControl } from "@mui/material";
  import './offre.css'
  const initialFieldValues = { 
    titre: "",
    description: "",
    image: "", 
    dateDebut: "", 
    dateFin: "", 
    souscategory: "",}


  const Offre = ({...props}) => {

    const dispatch = useDispatch()
    const [data, setData] = useState(initialFieldValues)
    const { titre, description, image, dateDebut, dateFin, souscategory } = data

    useEffect(() => {
        props.AllSous();
      }, []);

    var { resetForm } = useForm(initialFieldValues, props.setCurrentId);
    const userExist = localStorage.getItem("user");

    const onSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => { resetForm() };
        if(!titre || !description || !image || !dateDebut || !dateFin || !souscategory) {
              toast.warn('Verifier vos champs !');
        }else{
            props.create(data, onSuccess);
            resetForm();
            props.setShowModal(false)
            setTimeout(() => {
                window.location.reload();
            }, 200);
        }
        
      };
  
    if(!userExist){
      return <Redirect to='/login'/>;
    }

    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value })
      }

    const reset = (e) => { resetForm() }

    return(
      <>
              <Card className="card-profile shadow ">
                <Row className="justify-content-center">
                  <Col>
                    <div className="card-profile-image">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                       
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    
                  </div>
                  <h3 className="mb-0">Ajouter une offre</h3>
                  
                </CardHeader>
                <CardBody className="">
                         
                  <Form role="form" onSubmit={onSubmit}>

                        <Row>
                        <Col lg="6">
                            <FormGroup>
                            <label className="form-control-label text-dark">
                                Titre
                            </label>
                                <Input
                                type="text"
                                name="titre"
                                value={titre}
                                onChange={handleChange('titre')}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormControl fullWidth>
                            <label className="form-control-label text-dark">
                                Catégorie
                            </label>
                            
                            <Input type="select" 
                            name="souscategory"
                            value={souscategory}
                            onChange={handleChange('souscategory')}
                            >
                                <option value="">Choisis une option</option>
                                {props.ListSC.map((cat,index) => {
                                    return ( 
                                        <option key={index} value={cat._id}>{cat.sousnomcat}</option>
                                    );
                                })}
                        
                            </Input>
                            
                            </FormControl>
                        </Col>
                        <Col >
                            <FormGroup>
                            <label className="form-control-label text-dark" >
                                Description
                            </label>
                            <Input
                                type="textarea"
                                name="description"
                                value={description}
                                onChange={handleChange('description')}
                                />
                            </FormGroup>
                        </Col>
                        </Row>
                        
                        <Row>
                        
                       

                        <Col lg="6">
                            <FormGroup>
                            <label className="form-control-label text-dark">
                                Date début
                            </label>
                            
                            <Input
                                type="date"
                                name="datedebut"
                                value={dateDebut}
                                onChange={handleChange('dateDebut')}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <label className="form-control-label text-dark">
                                Date fin
                            </label>
                            <Input
                                type="date"
                                name="datefin"
                                value={dateFin}
                                onChange={handleChange('dateFin')}
                                />
                            </FormGroup>
                        </Col>

                        <Col lg="6">
                            <FormGroup>
                            <label className="form-control-label text-dark">
                                Image:
                            </label>
                            <label className="custom-file-upload ">
                                 <i class="btn btn-outline-dark btn-sm form-control-label far fa-upload "></i>
                                <FileBase64
                                type="file"
                                multiple={false}
                                accept=".png, .jpg, .jpeg"
                                onDone={({ base64 }) => 
                                        //setItem({ ...item, image: base64 }),
                                        setData({...data, image: base64},
                                                setTimeout(() => {
                                                    toast.info('Photo 100% ')
                                                    }, 1000) )
                                    }
                            />
                            </label>
                           
                           
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                           
                        
                            <Input disabled
                                type="text"
                                name="image"
                                value={image}
                                onChange={handleChange('image')}
                                />
                            </FormGroup>
                        </Col>
                       
                        </Row>                        
     
                    <div className="text-center">
                              <Button className="my-4 btn-outline-success" color="dark" type="submit">
                                  Confirmer
                               </Button>
                               <Button className="my-4 btn-outline-danger" 
                                       color="dark" type="submit" onClick={() => props.setShowModal(false)}>
                                  Annuler
                               </Button>
                    </div>

                  </Form>

                  
                </CardBody>
              </Card>
                 
      </>
    );
  };
  
  const mapActionToProps = {
    create: addOffre,
    AllSous: getAllSousCat
  };
  
  const mapStateToProps = (state) => ({
    List: state.offres.offres,
    ListSC: state.categories.souscategories
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(Offre);
