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
  import React, { useState } from "react";
  import { updateCat, addSousCat } from "redux/cat/catActions";
  import useForm from "helpers/useForm";
  const initialFieldValues = { sousnomcat:"", category:""}


  const SousCategorie = ({...props}) => {

    const dispatch = useDispatch()

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
      } = useForm(initialFieldValues, props.setCurrentId);

    const validate = () => {
        let temp = {...errors};
        temp.sousnomcat = values.sousnomcat ? "" : "This field is required.";   
        temp.category = values.category ? "" : "This field is required.";  
        setErrors({...temp,});
        return Object.values(temp).every((p) => p === "");
      };
      
    const userExist = localStorage.getItem("user");
    const onSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => { resetForm() };

        if (validate()) {
              props.create(values, onSuccess);
              props.setShowModal2(false)   
              resetForm();

            setTimeout(() => {
              window.location.reload();
            }, 2000);
        }
      };
  
    if(!userExist){
      return <Redirect to='/login'/>;
    }

    const reset = (e) => { resetForm() }
    const [SC, setSC] = useState(values.category = props.currentId);

    return(
      <>
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-1" lg="2">
                    <div className="card-profile-image">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                       
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    
                  </div>
                  <h3 className="mb-0">Ajouter une sous-catégorie</h3>
                  
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                         
                  <Form role="form" onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Titre de sous-categorie"
                          type="text"
                          name="sousnomcat"
                          value={values.sousnomcat}
                          onChange={handleInputChange}
                        />
                         
                      </InputGroup>
                      <InputGroup className="input-group-alternative">
                       
                         <Input hidden
                          placeholder="Titre de sous-categorie"
                          type="text"
                          name="category"
                          value={SC}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </FormGroup>

                  
                    <div className="text-center">
                              <Button className="my-4 btn-outline-success" color="dark" type="submit">
                                  Confirmer
                               </Button>
                               <Button className="my-4 btn-outline-danger" 
                                       color="dark" onClick={() => props.setShowModal2(false)}>
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
    create: addSousCat,
    update: updateCat,
  };
  
  const mapStateToProps = (state) => ({
    List: state.categories.souscategories,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(SousCategorie);
