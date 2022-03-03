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
import {useDispatch, useSelector} from 'react-redux';
import React, { useState } from "react";
import useForm from "../helpers/useForm";
import { updatePassword } from "redux/users/userActions";
import { data } from "jquery";
const initialFieldValues = {}

const UpdatePass = ({...props}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);  

  const [password, setP] = useState('');
  const [confirmpass, setCp] = useState('');
  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
      e.preventDefault();    
      if (props.currentId !== 0){

         dispatch(updatePassword(password, confirmpass))

         setTimeout(() => {
           window.location.reload();
        }, 2000);

         reset()

      } else {  
        toast.error('Erreur');
        resetForm();
      }   
  };

  const reset = (e) => { resetForm(); }
  

  return (


    <Card className="bg-secondary shadow">

      <CardBody className="pt-0 pt-md">
        <Form onSubmit={handleSubmit} >
          <Row className="align-items-center">
            <Col xs="8">
              <h6 className="heading-small text-muted mb-4">
              Mettre a jour votre mot de passe
              </h6>
            </Col>
        </Row>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Nouveau mot de passe
                  </label>
                  <Input
                    value={password}
                    name="password"
                    onChange={e => setP(e.target.value)}
                    className="form-control-alternative"
                    type="password"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Confirmation mot de passe
                  </label>
                  <Input
                    value={confirmpass}
                    name="confirmpass"
                    onChange={e => setCp(e.target.value)}
                    className="form-control-alternative"
                    type="password"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
                className="btn-outline-dark"
                color="default"
                size="md"
                type="submit"
              >
                Confirmer
              </Button>

              <Button
                className="btn-outline-dark"
                color="default"
                size="md"
                type="submit"
                onClick={() => reset()}
              >
                Annuler 
              </Button>
            
             
            
          </div>

        </Form>
      </CardBody>
    </Card>

  );
};


export default UpdatePass;
