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
          if (props.currentId === 0){
    
              props.create(values, onSuccess);
              props.setCurrentIndex(-1) 
              resetForm();
             
          } else {
            
            props.update(props.currentId, values, onSuccess);
            
            setTimeout(() => {
                window.location.reload();
              }, 2000);

          }   
    
        }
      };
  

    const reset = (e) => { 
      resetForm(),
      props.setCurrentIndex(-1) 
    }
  
    return(
      <>      
              <Form role="form" onSubmit={onSubmit}>
                      <td className="border-0">
                      <Input
                            type="text"
                            bsSize="sm"
                            name="nomcat"
                            value={values.nomcat}
                            onChange={handleInputChange}
                          />
                      </td>
                     <td className="border-0">
                     <Button className=" btn-outline-success" color="dark" size="sm" type="submit">
                          Confirmer
                      </Button>
                      <Button className="btn-outline-dark" onClick={() => reset()} color="dark" size="sm" type="submit">
                          Annuler
                      </Button>
                     </td>                    
                  </Form>
                  
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
  
  export default connect ( mapStateToProps, mapActionToProps )(UpdateCategorie);
