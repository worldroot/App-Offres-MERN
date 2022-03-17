// reactstrap components
import {
    Button,
    Form,
    Input,
  } from "reactstrap";
  // core components
  import { connect } from 'react-redux';
  import React, { useEffect } from "react";
  import { updateSousCat } from "redux/cat/catActions";
  import useForm from "helpers/useForm2";
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
      <>      
              <td className=" p-0">

              <Form role="form" onSubmit={onSubmit}>
                      <td className="">
                        <Input
                            type="text"
                            bsSize="sm"
                            name="sousnomcat"
                            value={values.sousnomcat}
                            onChange={handleInputChange}
                          />
                      </td>
                     <td className="">
                     <Button className=" btn-outline-success" color="dark" size="sm" type="submit">
                          <i className="far fa-check-circle"></i>
                      </Button>
                      <Button className="btn-outline-dark" onClick={() => reset()} color="dark" size="sm" type="submit">
                          <i className="far fa-times-circle"></i>
                      </Button>
                     </td>                    
                  </Form>
              </td>
                  
      </>
    );
  };
  
  const mapActionToProps = {
    update: updateSousCat,
  };
  
  const mapStateToProps = (state) => ({
    List: state.categories.souscategories,
  });
  
  export default connect ( mapStateToProps, mapActionToProps )(UpdateSousCategorie);
