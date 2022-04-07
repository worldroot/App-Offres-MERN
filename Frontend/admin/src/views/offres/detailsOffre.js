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
  titre: "",
  description: "",
  image: "",
  dateDebut: "",
  dateFin: "",
  souscategory: "",
  category: "",
  prixdebut: "",
};

const DetailsOffre = ({ ...props }) => {
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

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
        toast.info("Upload done");
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setData({ ...data, image: base64 });
  };

  const handleChangeDate = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const reset = (e) => {
    resetForm();
    setShowList(false);
    setData(initialFieldValues);
  };

  const [ShowList, setShowList] = useState(false);
  var date = new Date();
  const DatetoCheck = new Date(date.getTime());
  const Debut = new Date(values.dateDebut);

  return (
    <>
      <Card>
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => props.setShowModal3(false)}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Details d'offre </h3>
          <small>{values.titre}</small>
        </CardHeader>

        <CardBody>
          {DatetoCheck < Debut && (
            <Form role="form">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <p>
                      Prix debut:
                      <label className="form-control-label text-dark mx-2">
                        {values.prixdebut} dt
                      </label>
                    </p>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <p>
                      Status:
                      <label className="form-control-label text-dark mx-2">
                      {values.status === "pending" && (
                                    <span className=" text-warning">
                                      Pending
                                    </span>
                                  )}
                                  {values.status === "archived" && (
                                    <span className=" text-dark">Archived</span>
                                  )}
                                  {values.status === "published" && (
                                    <span className=" text-success">
                                      Published
                                    </span>
                                  )}
                      </label>
                    </p>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <p>
                      Catégories:
                      <label className="form-control-label text-dark mx-2">
                        {values.category}
                      </label>
                    </p>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <p>
                      Sous-catégories:
                      <label className="form-control-label text-dark mx-2">
                        {values.souscategory}
                      </label>
                    </p>
                  </FormGroup>
                </Col>
              </Row>
             

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <p>
                      Date début :
                      <label className="form-control-label text-dark mx-2">
                        {values.dateDebut.substring(0, 10)}
                      </label>
                    </p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <p>
                      Date fin :
                      <label className="form-control-label text-dark mx-2">
                        {values.dateFin.substring(0, 10)}
                      </label>
                    </p>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <p>
                      Description:
                      <label className="form-control-label text-dark mx-2">
                        {values.description}
                      </label>
                    </p>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <p className="">
                      Image:
                      {values.image.map((img) => (
                        <>
                          <label className="form-control-label text-dark mx-4">
                            <img
                              className="img-fluid rounded shadow avatar avatar-lg hover-zoom"
                              src={img}
                              alt=""
                            />
                          </label>
                        </>
                      ))}
                    </p>
                  </FormGroup>
                </Col>
              </Row>

            </Form>
          )}
        </CardBody>
      </Card>
    </>
  );
};

const mapActionToProps = {
  All: getAllCat,
  AllSous: getAllSousCat,
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListC: state.categories.categories,
  ListSC: state.categories.souscategories,
});

export default connect(mapStateToProps, mapActionToProps)(DetailsOffre);
