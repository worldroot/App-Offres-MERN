// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
// core components
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import React, { Fragment, useState, useEffect } from "react";
import { updateOffre } from "redux/offres/offreActions";
import { getAllCat, getAllSousCat } from "redux/cat/catActions";
import useForm from "helpers/useFormObj";
import "./offre.css";

const initialFieldValues = {
  status: ""
};

const UpdateOffre = ({ ...props }) => {
  useEffect(() => {
    if (props.currentObj !== {}) {
      setValues({ ...props.currentObj });
      setErrors({});
    }
  }, [props.currentObj]);

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentObj);

  const [data, setData] = useState(initialFieldValues);

  useEffect(() => {
    props.All();
    props.AllSous();
  }, []);

  const userExist = localStorage.getItem("user");

  var date = new Date();
  const DatetoCheck = new Date(date.getTime());
  const Debut = new Date(values.dateDebut);
  const Fin = new Date(values.dateDebut);
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (DatetoCheck > Debut && DatetoCheck < Fin) {
      setValues({ ...values, status: "published" });
      
    }else{
      setValues({ ...values, status: "pending" });
    }
    props.update(props.currentObj._id, values);
    props.setShowModal4(false);
    reset();
  };

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  const reset = (e) => {
    resetForm();
    setData(initialFieldValues);
  };

  return (
    <>

        <Card >
          <Row className="justify-content-center">
            <Col>
             
            </Col>
          </Row>

          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div className="d-flex justify-content-between"></div>
            <h3 className="mb-0">Modifier status d'offre</h3>
          </CardHeader>

          <CardBody>
            <Form role="form" onSubmit={onSubmit}>


              <div className="text-center">
                <Button
                  className="my-4 btn-outline-success"
                  color="dark"
                  type="submit"
                >
                  Oui
                </Button>
                <Button
                className="my-4 btn-outline-danger"
                onClick={() => props.setShowModal4(false)}
              >
               Non
              </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
   
    </>
  );
};

const mapActionToProps = {
  update: updateOffre,
  All: getAllCat,
  AllSous: getAllSousCat,
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListC: state.categories.categories,
  ListSC: state.categories.souscategories,
});

export default connect(mapStateToProps, mapActionToProps)(UpdateOffre);
