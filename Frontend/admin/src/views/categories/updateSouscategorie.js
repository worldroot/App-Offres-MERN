// reactstrap components
import {
    Button,
    Form,
    FormGroup,
    Input,
    Row
  } from "reactstrap";
  // core components
  import { connect } from 'react-redux';
  import React, { useEffect } from "react";
  import { updateSousCat } from "redux/cat/catActions";
  import useForm from "helpers/useForm2";
  import { motion } from 'framer-motion';
  import { Typography } from "@mui/material";
  import AccordionDetails from '@mui/material/AccordionDetails';
  const initialFieldValues = { sousnomcat:"" }

  const UpdateSousCategorie = ({...props}) => {

    useEffect(() => {
        if (props.currentIdS2 !== 0) {
          setValues({
            ...props.List.find((p) => p._id === props.currentIdS2),
          });
          setErrors({});
        }
    
      }, [props.currentIdS2]);

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
      } = useForm(initialFieldValues, props.currentIdS2);

    const validate = () => {
        let temp = {...errors};
        temp.sousnomcat = values.sousnomcat ? "" : "This field is required.";   
        setErrors({...temp,});
        return Object.values(temp).every((p) => p === "");
      };
      
    const onSubmit = (e) => {
        e.preventDefault();
        const onSuccess = () => { resetForm(); };
        if (validate()) {
            
            props.update(props.currentIdS2, values, onSuccess);
            //props.setCurrentIndex2(-1) 
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        }
      };
  
    const reset = (e) => { 
      props.setCurrentIdS2(0),
      props.setCurrentIndex2(-1) 
    }


  
    return(
             
               <AccordionDetails>
                  <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{  duration: 0.5 }}>
                  <Form className="d-flex justify-content-between" role="form" onSubmit={onSubmit}>
                    
                      <Input  type="text"
                            bsSize="sm"
                            className="mx-2"
                            name="sousnomcat"
                            value={values.sousnomcat}
                            onChange={handleInputChange}
                          />
                      <Typography>
                        <Button className=" btn-outline-success" color="dark" size="sm" type="submit">
                          <i className="far fa-check-circle"></i>
                      </Button>
                      <Button className="btn-outline-dark" onClick={() => reset()} color="dark" size="sm" type="submit">
                          <i className="far fa-times-circle"></i>
                      </Button>
                      </Typography>
                     
                  </Form>
              </motion.div>
             </AccordionDetails>           
    );
  };
  
  const mapActionToProps = {
    update: updateSousCat,
  };
  
  const mapStateToProps = (state) => ({
    List: state.categories.souscategories,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(UpdateSousCategorie);
