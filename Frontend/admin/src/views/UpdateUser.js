import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import React, { useEffect } from "react";
import useForm from "helpers/useForm";


const initialFieldValues = {
  name:"",
  description: "",
  price : "",
  quantity: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: "",
}

const UpdateUserDetails = ({...props}, user) => {

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  useEffect(() => {


  }, [props.currentId]);

  const validate = () => {
    let temp = {...errors};
    temp.nom = values.nom ? "" : "This field is required.";
    temp.prenom = values.prenom ? "" : "This field is required.";
    temp.email = values.email ? "" : "This field is required.";
    
    setErrors({...temp,});
    return Object.values(temp).every((p) => p === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    const onSuccess = () => {
      resetForm();
    };

    if (validate()) {
      if (props.currentId !== 0){
          
          //props.updateP(props.currentId, values, onSuccess);
          toast.info('Mis à jour avec succés');

      } else {  
        toast.error('Erreur');
      }   

    }else { toast.error('Warning ! '); }
  };
  const reset = (e) => { resetForm(); }
  

  return (


          <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                     
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    
                    <Row className="align-items-center">
                        <Col xs="8">
                          <h6 className="heading-small text-muted mb-4">
                            User information
                          </h6>
                        </Col>
                        <Col className="text-right" xs="4">
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            Settings
                          </Button>
                        </Col>
                    </Row>

                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nom
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              placeholder={user.nom}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Prenom
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Jesse"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                       
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="jesse@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                  </Form>
                </CardBody>
              </Card>
            </Col>

  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapActionToProps = {
  
};

export default connect(mapToStateProps)(UpdateUserDetails);
