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
  import {toast} from 'react-toastify'
  import React, { useEffect } from "react";
  import { updateCat } from "redux/cat/catActions";
  import { motion } from 'framer-motion';
  import useForm from "helpers/useForm";
  const initialFieldValues = { nomcat:"",}

  const UpdateCategorie = ({...props}) => {

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
      
    const onSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => {
          
          resetForm();
        };
        if (validate()) {

            props.update(props.currentId, values, onSuccess);
            props.setCurrentIndex(-1) 
            setTimeout(() => {
                window.location.reload();
              }, 2000);

        }
      };
  

    const reset = (e) => { 
      resetForm(),
      props.setCurrentIndex(-1) 
    }
  
    return(
      <>      
              <motion.td
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{  duration: 0.5 }}>
                <Form className="d-flex justify-content-between" role="form" onSubmit={onSubmit}>
                      
                      <Input
                            type="text"
                            bsSize="sm"
                            name="nomcat"
                            value={values.nomcat}
                            onChange={handleInputChange}
                            className="mx-2"
                          />
                    
                     <Button className=" btn-outline-success" color="dark" size="sm" type="submit">
                          Confirmer
                      </Button>
                      <Button className="btn-outline-dark" onClick={() => reset()} color="dark" size="sm" type="submit">
                          Annuler
                      </Button>
                                     
                  </Form>
                </motion.td>
      </>
    );
  };
  
  const mapActionToProps = {
    update: updateCat,
  };
  
  const mapStateToProps = (state) => ({
    List: state.categories.categories,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(UpdateCategorie);
