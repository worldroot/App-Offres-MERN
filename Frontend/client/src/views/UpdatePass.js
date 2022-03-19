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
import { toast } from "react-toastify";
const initialFieldValues = {}

const UpdatePass = ({...props}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);  

  const [password, setP] = useState('');
  const [confirmpass, setCp] = useState('');
  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
      e.preventDefault();   
      if(!password || !confirmpass){
        toast.warn("Verifier vos champs !")
      }
      
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
<>
<hr className="my-4" />

<FormGroup onSubmit={handleSubmit} >
    <Row className="align-items-center">
          <Col xs="8">
          <h6 className="heading-small text-muted mb-4">
              User information
              </h6>          </Col>
          <Col className="text-right" xs="4">
            <Button
                className="btn-outline-success"
                color="default"
                size="sm"
                type="submit"
              >
                Confirmer
              </Button>

             
          </Col>
        </Row>

          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
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
                  <label className="form-control-label text-dark">
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
           

          </div>

        </FormGroup>

</>
  );
};


export default UpdatePass;
