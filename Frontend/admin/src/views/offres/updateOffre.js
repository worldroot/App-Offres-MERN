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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import "../../components/Loading/loading.css";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { updateOffre } from "redux/offres/offreActions";
import { getAllUsers } from "redux/users/userActions.js";
import { getAllCat, getAllSousCat } from "redux/cat/catActions";
import useForm from "helpers/useFormObj";
import "./offre.css";

const UpdateOffre = ({ ...props }) => {
  useEffect(() => {
    props.All();
    props.AllUsers();
    props.AllSous();
  }, []);

  useEffect(() => {
    if (props.currentObj !== {}) {
      setValues(props.currentObj);
      setErrors({});
      props.ListU.map((u, index) => {
        if (u._id === values.responsable) {
          setresdep(u);
          //console.log(u);
        }
      });
    }
  }, [props.currentObj]);

  const initialFieldValues = props.currentObj;

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentObj);

  const initRes = {
    email: "",
    _id: values.responsable,
    OneSignalID: [],
  };

  const inputRef = useRef(null);

  useEffect(() => {
    props.All();
    props.AllUsers();
    props.AllSous();
  }, []);

  const userExist = localStorage.getItem("user");
  const ImgStyle = {
    width: "100px",
    height: "100px",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.update(props.currentObj._id, values);
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
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onDelete = async (e) => {
    const files = values.image;
    const filtered = files.filter((item, index) => index !== e);
    setValues({ ...values, image: filtered });
  };

  const handleFileUpload = async (e) => {
    const files = [...e.target.files];
    files.forEach((file) => {
      convertToBase64(file).then((res) => {
        //console.log(res);
        setValues({ ...values, image: [...values.image, res] });
      });
    });
  };

  const handleChangeDate = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const reset = (e) => {
    resetForm();
    setShowList(false);
    setValues(initialFieldValues);
    props.setShowModal2(false);
    inputRef.current.value = null;
  };

  const [resdep, setresdep] = useState(initRes);
  const [ShowList, setShowList] = useState(false);

  useEffect(() => {
    if (resdep) {
      setValues({
        ...values,
        responsable: resdep._id,
      });
    }
  }, [resdep.email]);

  //console.log(values.responsable);
  //console.log(resdep);

  return (
    <>
      <Card className=" overflow-auto h-100vh">
        <Row className="justify-content-center">
          <Col>
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => reset()}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>

        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Modifier une offre</h3>
        </CardHeader>

        <CardBody>
          <Form role="form" onSubmit={onSubmit}>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">Titre</label>
                  <Input
                    type="text"
                    name="titre"
                    defaultValue={values.titre}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Prix debut (dt)
                  </label>
                  <Input
                    min={1}
                    type="number"
                    step="0.1"
                    name="prixdebut"
                    defaultValue={values.prixdebut}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Cat??gories
                  </label>

                  <Input
                    type="select"
                    name="category"
                    defaultValue={values.category}
                    onChange={handleInputChange}
                  >
                    {props.ListC.map((cat, index) => {
                      return (
                        <Fragment key={index}>
                          <option value={cat.nomcat}>{cat.nomcat}</option>
                        </Fragment>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Sous-cat??gories
                  </label>
                  <Input
                    type="select"
                    name="souscategory"
                    defaultValue={values.souscategory}
                    onChange={handleInputChange}
                  >
                    {props.ListSC.filter((sous) => {
                      if (sous.catref === values.category) {
                        return sous;
                      }
                    }).map((sous, index) => {
                      return (
                        <Fragment key={index}>
                          <option value={sous.sousnomcat}>
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
                    defaultValue={values.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Date d??but
                  </label>
                  <Input
                    type="date"
                    name="dateDebut"
                    defaultValue={
                      values.dateDebut ? values.dateDebut.substring(0, 10) : ""
                    }
                    onChange={handleChangeDate("dateDebut")}
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
                    name="dateFin"
                    min={
                      values.dateDebut ? values.dateDebut.substring(0, 10) : ""
                    }
                    defaultValue={
                      values.dateFin ? values.dateFin.substring(0, 10) : ""
                    }
                    onChange={handleChangeDate("dateFin")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="text-center">
              {resdep.email === "" ? (
                <Col>
                  <div className="text-center my-3">
                    <div id="small-loading"></div>
                  </div>
                </Col>
              ) : (
                <Col>
                  <FormGroup>
                    <label className="form-control-label text-dark text-center">
                      Selectionner responsable d??pouillement
                    </label>
                    <Col>
                      <UncontrolledDropdown className="bg-white" size="sm">
                        {resdep.email ? (
                          <DropdownToggle caret>
                            <label className="form-control-label text-dark m-2">
                              {resdep.email}
                            </label>
                          </DropdownToggle>
                        ) : (
                          <DropdownToggle caret>
                            <label className="form-control-label text-dark m-2">
                              Choisis un responsable
                            </label>
                          </DropdownToggle>
                        )}

                        <DropdownMenu>
                          {props.ListU.filter((user) => {
                            if (user.role === "admin") {
                              return user;
                            }
                          }).map((u, index) => {
                            return (
                              <Fragment key={index}>
                                <DropdownItem
                                  onClick={() => {
                                    setresdep(u);
                                  }}
                                >
                                  {u.email}
                                </DropdownItem>
                              </Fragment>
                            );
                          })}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                  </FormGroup>
                </Col>
              )}
            </Row>
            <Row>
              <Col className="text-center">
                <FormGroup>
                  <label className="custom-file-upload form-control-label btn border-info text-info">
                    Choisir un fichier
                    <i className=" mx-2 form-control-label far fa-upload text-md text-info "></i>
                    <Input
                      ref={inputRef}
                      type="file"
                      multiple="multiple"
                      name="image"
                      accept=".jpeg, .png, .jpg"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </label>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              {values.image.map((img, index) => (
                <Fragment key={index}>
                  <label className="form-control-label text-dark mx-1 align-items-center d-none d-md-flex">
                    <img
                      style={ImgStyle}
                      className=" p-md--1 img-fluid rounded shadow avatar avatar-lg mx-2"
                      src={img}
                      alt=""
                    />
                    <i
                      className="btn btn-sm btn-danger shadow-none--hover shadow-none fas fa-times mx--4 top--5"
                      onClick={() => onDelete(index)}
                    ></i>
                  </label>
                </Fragment>
              ))}
            </Row>

            <div className="text-center">
              <Button
                className="my-4 btn-outline-success"
                color="dark"
                type="submit"
              >
                Confirmer
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListC: state.categories.categories,
  ListSC: state.categories.souscategories,
  ListU: state.users.uslist,
});

const mapActionToProps = {
  update: updateOffre,
  All: getAllCat,
  AllUsers: getAllUsers,
  AllSous: getAllSousCat,
};

export default connect(mapStateToProps, mapActionToProps)(UpdateOffre);
