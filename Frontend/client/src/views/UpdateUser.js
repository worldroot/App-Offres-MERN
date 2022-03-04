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
import { updateUser } from "redux/users/userActions";
import UpdatePass from "./UpdatePass";
import { motion, AnimatePresence} from 'framer-motion'

const initialFieldValues = {}

const UpdateUserDetails = ({...props}) => {

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);

  /*
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  */
  
  const [nom, setnom] = useState(user.nom);
  const [prenom, setprenom] = useState(user.prenom);
  const [email, setemail] = useState(user.email);

  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
      e.preventDefault();    
      if (props.currentId !== 0){

         dispatch(updateUser(nom, prenom, email))

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
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">My account</h3>
          </Col>
          <Col className="text-right" xs="4">
                    <Button
                      color="btn btn-outline-dark"
                      onClick={() => setCurrentId(user._id)}
                      size="sm"
                    >
                      Modifier votre mot de passe
                    </Button>
                  </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0 pt-md">
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
                className="btn-outline-dark"
                color="default"
                size="sm"
                type="submit"
              >
                Confirmer
              </Button>
              <Button
                className="btn-outline-dark"
                color="default"
                size="sm"
                type="submit"
                onClick={() => reset()}
              >
                Annuler 
              </Button>
            
             
            
          </div>

        </Form>
       <AnimatePresence>
        { currentId !== 0 && (
            <>
              <motion.div  
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{  duration: 1.5 }}
                  exit={{opacity: 0}}>
                <UpdatePass {...{ currentId, setCurrentId }} />
              </motion.div>
            </>
          )} 
       </AnimatePresence>
        

        
      </CardBody>
    </Card>

</>

    

  );
};


export default UpdateUserDetails;
