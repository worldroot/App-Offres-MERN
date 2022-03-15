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
  import { connect, useDispatch } from 'react-redux';
  import React, { useEffect, useState } from "react";
  import { banUser } from "redux/users/userActions";
  import useForm from "helpers/useForm";
  const initialFieldValues = { banned:"",}

  const BanUser = ({...props}) => {

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
        temp.banned = values.banned ? "" : "This field is required.";   
        setErrors({...temp,});
        return Object.values(temp).every((p) => p === "");
      };
      
    const onSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => {
          
          resetForm();
        };
        if (validate()) {
          if (props.currentId !== 0){
    
              props.update(props.currentId, values, onSuccess);
              setTimeout(() => {
                  window.location.reload();
                }, 2000);
              resetForm();
             
          } 
        }
      };
  
    const reset = (e) => { 
      resetForm(),
      props.setCurrentIndex(-1) 
    }
  
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
                  <h3 className="mb-0">Sur de bannir ce utilisateur ?</h3>
                </CardHeader>
                <CardBody className="pt-0 pt-md-2">
                    <Form role="form" onSubmit={onSubmit}>
                              
                      <div className="text-center">
                        <Input
                            type="text"
                            bsSize="sm"
                            name="banned"
                            color="red"
                            value={values.banned}
                            onChange={handleInputChange}
                          />
                      </div>
                      <div className=" text-center">
                                <Button className="my-4 btn-outline-dark"
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
    update: banUser,
  };
  
  const mapStateToProps = (state) => ({
    List: state.users.uslist,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(BanUser);
