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
import useForm from "helpers/useForm";
import "./offre.css";
const initialFieldValues = {
  titre: "",
  description: "",
  image: "",
  dateDebut: "",
  dateFin: "",
  souscategory: "",
};

const UpdateOffre = ({ ...props }) => {
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.List.find((p) => p._id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentId);

  const [data, setData] = useState(initialFieldValues);

  useEffect(() => {
    props.All();
    props.AllSous();
  }, []);

  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);
  const userExist = localStorage.getItem("user");

  const onSubmit = (e) => {
    e.preventDefault();

    props.update(props.currentId, values);
    props.setShowModal2(false);
    reset();
  };

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
    const { name } = e.target;
    setValues({ ...values, [name]: base64 });
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
              onClick={() => props.setShowModal2(false)}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          {DatetoCheck < Debut && <h3 className="mb-0">Modifier une offre</h3>}

          {DatetoCheck > Debut && (
            <h1 className="mb-0 text-danger">
              Impossible de modifier l'offre choisis
            </h1>
          )}
        </CardHeader>

        <CardBody>
          {DatetoCheck < Debut && (
            <Form role="form" onSubmit={onSubmit}>
              <Row>
                <Col>
                  <FormGroup>
                    <label className="form-control-label text-dark">
                      Titre
                    </label>
                    <Input
                      type="text"
                      name="titre"
                      value={values.titre}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label text-dark">
                      Prix debut
                    </label>
                    <Input
                      min={1}
                      type="number"
                      name="prixdebut"
                      value={values.prixdebut}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label text-dark">
                      Status
                    </label>
                    <Input
                      type="select"
                      name="status"
                      value={values.status}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label text-dark">
                      Catégories
                    </label>

                    <Input
                      type="select"
                      name="category"
                      value={values.category}
                      onChange={handleInputChange}
                    >
                      {props.ListC.map((cat, index) => {
                        return (
                          <Fragment key={index}>
                            <option key={cat._id} value={cat._id}>
                              {cat.nomcat}
                            </option>
                          </Fragment>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label text-dark">
                      Sous-catégories
                    </label>
                    <Input
                      type="select"
                      name="souscategory"
                      value={values.souscategory}
                      onChange={handleInputChange}
                    >
                      {props.ListSC.filter((sous) => {
                        if (sous.category === values.category) {
                          return sous;
                        }
                      }).map((sous, index) => {
                        return (
                          <Fragment key={index}>
                            <option key={sous._id} value={sous._id}>
                              {sous.sousnomcat}
                            </option>
                          </Fragment>
                        );
                      })}
                    </Input>
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
                      value={values.description}
                      onChange={handleInputChange}
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
                      min={values.dateDebut.substring(0, 10)}
                      value={values.dateDebut.substring(0, 10)}
                      onChange={handleInputChange}
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
                      min={values.dateFin.substring(0, 10)}
                      value={values.dateFin.substring(0, 10)}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="custom-file-upload form-control-label btn border-info text-info">
                      Choisir un fichier
                      <i className=" mx-2 form-control-label far fa-upload text-md text-info "></i>
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
                    value={values.image}
                    onChange={handleInputChange}
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
                  className="my-4 btn-outline-dark"
                  color="dark"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </div>
            </Form>
          )}
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
