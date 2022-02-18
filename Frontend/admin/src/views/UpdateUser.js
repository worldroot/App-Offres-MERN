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
import {connect, useSelector} from 'react-redux';
import React, { useState } from "react";
import useForm from "../helpers/useForm";
import { getAllUsers, updateUser } from "redux/users/userActions";
const initialFieldValues = {}

const UpdateUserDetails = ({...props}) => {

  const user = useSelector(state => state.auth.user);
  const [nom, setnom] = useState(user.nom);
  const [prenom, setprenom] = useState(user.prenom);
  const [email, setemail] = useState(user.email);

  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {

    e.preventDefault();    

      if (props.currentId !== 0){
          
          //props.UP(props.currentId, values, onSuccess);
          UP({nom, prenom, email})
          

      } else {  
        toast.error('Erreur');
      }   

  };
  const reset = (e) => { resetForm(); }
  

  return (


    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">My account</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} >
          <Row className="align-items-center">
            <Col xs="8">
              <h6 className="heading-small text-muted mb-4">
              User information
              </h6>
            </Col>
        </Row>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Nom
                  </label>
                  <Input
                    value={nom}
                    name="nom"
                    onChange={e => setnom(e.target.value)}
                    className="form-control-alternative"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" >
                    Prenom
                  </label>
                  <Input
                     value={prenom}
                     name="prenom"
                     onChange={e => setprenom(e.target.value)}
                    className="form-control-alternative"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Email address
                  </label>
                  <Input
                    value={email}
                    name="email"
                    onChange={e => setemail(e.target.value)}
                    className="form-control-alternative"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
                color="default"
                onClick={(e) => e.preventDefault()}
                size="md"
                type="submit"
              >
                Confirmer
              </Button>
            <Button
                color="info"
                onClick={() => reset()}
                size="md"
              >
                Annuler
              </Button>
             
            
          </div>

        </Form>
      </CardBody>
    </Card>

  );
};

const mapStateToProps = (state) => ({
  List: state.users.uslist,
});

const mapActionToProps = {
    All: getAllUsers,
    UP: updateUser
};

export default connect(mapStateToProps, mapActionToProps)(UpdateUserDetails);
