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
  import React, { useEffect } from "react";
  import { updateCat, addCat } from "redux/cat/catActions";
  import useForm from "helpers/useForm";
  const initialFieldValues = { nomcat:"",}

  const Categorie = ({...props}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.currentId !== 0) {
          setValues({
            ...props.List.find((p) => p._id === props.currentId),
          });
          setErrors({});
        }
    
      }, [props.currentId]);

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
        temp.nomcat = values.nomcat ? "" : "This field is required.";   
        setErrors({...temp,});
        return Object.values(temp).every((p) => p === "");
      };
      
    const userExist = localStorage.getItem("user");
    const onSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => {
          
          resetForm();
        };
        if (validate()) {
          if (props.currentId === 0){
    
              props.create(values, onSuccess);
              resetForm();
             
          } else {
            
            props.update(props.currentId, values, onSuccess);
            setTimeout(() => {
                window.location.reload();
              }, 2500);
            //dispatch(updateCat(props.currentId, values))
            
            
          }   
    
        }else { toast.warn('Warning ! '); }
      };
  
    if(!userExist){
      return <Redirect to='/login'/>;
    }

    const reset = (e) => { resetForm() }
  
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
                   
                    <Button
                      className=" btn-outline-default "
                      color="default"
                      onClick={() => reset()}
                      size="sm"
                    >
                      <i className="fas fa-redo"></i>
                    </Button>

                    
                  </div>
                  { props.currentId !== 0 && (
                       <h3 className="mb-0">Modifier une catégorie</h3>
                  )}
                   { props.currentId === 0 && (
                       <h3 className="mb-0">Ajouter une catégorie</h3>
                  )}
                  
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                         
                  <Form role="form" onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Titre de categorie"
                          type="text"
                          name="nomcat"
                          value={values.nomcat}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </FormGroup>

                  
                    <div className="text-center">
                              <Button className="my-4 btn-outline-dark" color="dark" type="submit">
                                  Confirmer
                               </Button>
                    </div>

                  </Form>
                </CardBody>
              </Card>
                 
      </>
    );
  };
  
  const mapActionToProps = {
    create: addCat,
    update: updateCat,
  };
  
  const mapStateToProps = (state) => ({
    List: state.categories.categories,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(Categorie);
