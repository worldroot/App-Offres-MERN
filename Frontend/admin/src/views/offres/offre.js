// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Media,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
// core components
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import React, { Fragment, useState, useEffect } from "react";
import { addOffre } from "redux/offres/offreActions";
import { getAllCat } from "redux/cat/catActions";
import useForm from "helpers/useForm";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import "./offre.css";
const initialFieldValues = {
  titre: "",
  description: "",
  image: "",
  dateDebut: "",
  dateFin: "",
  souscategory: "",
};

const Offre = ({ ...props }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialFieldValues);
  const {
    titre,
    description,
    image,
    dateDebut,
    dateFin,
    souscategory,
    category,
  } = data;

  useEffect(() => {
    props.All();
  }, []);

  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);
  const userExist = localStorage.getItem("user");

  const onSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      resetForm();
    };

    props.create(data, onSuccess);
    resetForm();
    props.setShowModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

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
        toast.error("Upload error");
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setData({ ...data, image: base64 });
  };

  const reset = (e) => {
    resetForm();
  };

  return (
    <>
      <Card className="card-profile shadow ">
        <Row className="justify-content-center">
          <Col>
            <div className="card-profile-image">
              <a href="#" onClick={(e) => e.preventDefault()}></a>
            </div>
          </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Ajouter une offre</h3>
        </CardHeader>
        <CardBody className="">
          <Form role="form" onSubmit={onSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <label className="form-control-label text-dark">Titre</label>
                  <Input
                    type="text"
                    name="titre"
                    value={titre}
                    onChange={handleChange("titre")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Accordion>
                    <AccordionSummary>
                      <label className="form-control-label text-dark">
                        Catégories et sous-catégorie
                      </label>
                    </AccordionSummary>
                    <AccordionDetails>
                      {props.ListC.map((cat, index) => {
                        return (
                          <Fragment key={index}>
                            <Accordion className="shadow-none border-0">
                              <AccordionSummary
                                aria-controls="panel1bh-content"
                                expandIcon={
                                  <i className="fas fa-angle-down fa-1x"></i>
                                }
                              >
                                <span className="mb-0 text-sm font-weight-bold">
                                  {cat.nomcat}
                                </span>
                                <span className="mx-2 text-sm font-weight-bold text-gray">
                                  ({cat.souscategorie.length})
                                </span>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Input
                                  type="select"
                                  name="souscategory"
                                  value={souscategory}
                                  onChange={handleChange("souscategory")}
                                >
                                  <option value="">
                                    Choisis une sous-catégorie
                                  </option>
                                  {cat.souscategorie.map(
                                    ({ sousnomcat, _id }) => {
                                      return (
                                        <option key={_id} value={_id}>
                                          {" "}
                                          {sousnomcat}{" "}
                                        </option>
                                      );
                                    }
                                  )}
                                </Input>
                              </AccordionDetails>
                            </Accordion>
                          </Fragment>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Description
                  </label>
                  <Input
                    type="textarea"
                    name="description"
                    value={description}
                    onChange={handleChange("description")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Date début
                  </label>

                  <Input
                    type="date"
                    name="datedebut"
                    value={dateDebut}
                    onChange={handleChange("dateDebut")}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Date fin
                  </label>
                  <Input
                    type="date"
                    name="datefin"
                    value={dateFin}
                    onChange={handleChange("dateFin")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="custom-file-upload form-control-label btn btn-outline-dark ">
                    Choisir un fichier
                    <i className=" mx-2 form-control-label far fa-upload text-md text-white"></i>
                    <Input
                      type="file"
                      multiple="multiple"
                      name="image"
                      accept=".jpeg, .png, .jpg"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </label>
                </FormGroup>
              </Col>
              <Col lg="6">
                <Input
                  disabled
                  className="border-0"
                  type="text"
                  name="image"
                  value={image}
                  onChange={handleChange("image")}
                />
              </Col>
            </Row>

            <div className="text-center">
              <Button
                className="my-4 btn-outline-success"
                color="dark"
                type="submit"
              >
                Confirmer
              </Button>
              <Button
                className="my-4 btn-outline-danger"
                color="dark"
                type="submit"
                onClick={() => props.setShowModal(false)}
              >
                Annuler
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const mapActionToProps = {
  create: addOffre,
  All: getAllCat,
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListC: state.categories.categories,
});

export default connect(mapStateToProps, mapActionToProps)(Offre);
