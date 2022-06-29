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
import { connect } from "react-redux";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import React, { Fragment, useState, useEffect } from "react";
import { addOffre } from "redux/offres/offreActions";
import { getAllCat, getAllSousCat } from "redux/cat/catActions";
import { getAllUsers } from "redux/users/userActions.js";
import useForm from "helpers/useForm";
import "./offre.css";
const initialFieldValues = {
  titre: "",
  description: "",
  image: [],
  dateDebut: "",
  dateFin: "",
  souscategory: "",
  category: "",
  prixdebut: "",
  responsable: {
    email: "",
    _id: "",
    OneSignalID: [],
  },
};

const initRes = {
  email: "",
  _id: "",
  OneSignalID: [],
};

const Offre = ({ ...props }) => {
  const ImgStyle = {
    width: "120px",
    height: "120px",
  };

  const [data, setData] = useState(initialFieldValues);
  const [resdep, setresdep] = useState(initRes);

  useEffect(() => {
    props.All();
    props.AllSous();
    props.AllUsers();
  }, []);

  var { resetForm } = useForm(initialFieldValues, props.setCurrentId);
  const userExist = localStorage.getItem("user");

  const onSubmit = (e) => {
    e.preventDefault();
    props.create(data);
  };

  if (!userExist) {
    return <Redirect to="/login" />;
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
    if (name === "category") {
      setShowList(true);
    }
  };

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

  const handleFileUpload = async (e) => {
    const files = [...e.target.files];
    files.forEach((file) => {
      convertToBase64(file).then((res) => {
        setData({ ...data, image: [...data.image, res] });
      });
    });
    setShowImg(true);
  };
  console.log(data.image);
  /*     const handleFileUpload = async (e) => {
    const files = [...e.target.files];
    const filePathsPromises = image;
    files.forEach((file) => {
      filePathsPromises.push(convertToBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => base64File);
    toast.info("Téléchargement d'images réussi");
    setShowImg(true);
    setData({ ...data, image: mappedFiles.reverse() });
  };
  */

  const onDelete = (e) => {
    const filtered = data.image.filter((item, index) => index !== e);
    setData({ ...data, image: filtered });
  };

  const reset = async (e) => {
    resetForm();
    setShowList(false);
    setShowImg(false);
    setData(initialFieldValues);
    //setData(image.splice(0,image.length))
  };

  const [ShowList, setShowList] = useState(false);
  const [ShowImg, setShowImg] = useState(false);
  var date = new Date();
  const DatetoCheck = date.toISOString().substring(0, 10);
  const Today = new Date(date.getTime());
  //console.log(data.responsable);

  useEffect(() => {
    if (resdep) {
      setData({
        ...data,
        responsable: {
          email: resdep.email,
          _id: resdep._id,
          OneSignalID: resdep.OneSignalID,
        },
      });
    }
  }, [resdep]);

  return (
    <>
      <Card className="card-profile shadow overflow-auto h-100vh ">
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0">
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              onClick={() => {
                props.setShowModal(false), setShowImg(false), reset();
              }}
            >
              <i className="fas fa-times fa-2x text-danger"></i>
            </Button>
          </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between"></div>
          <h3 className="mb-0">Ajouter une offre</h3>
        </CardHeader>
        <CardBody className="">
          <Form role="form" onSubmit={onSubmit}>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">Titre</label>
                  <Input
                    type="text"
                    name="titre"
                    value={data.titre}
                    onChange={handleChange("titre")}
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Prix debut (dt)
                  </label>

                  <Input
                    name="prixdebut"
                    className="form-control"
                    type="number"
                    value={data.prixdebut}
                    onChange={handleChange("prixdebut")}
                  />
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
                    value={data.category}
                    onChange={handleChange("category")}
                  >
                    <option>Choisis une catégorie</option>
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
              {ShowList && (
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label text-dark">
                      Sous-catégories
                    </label>
                    <Input
                      type="select"
                      name="souscategory"
                      value={data.souscategory}
                      onChange={handleChange("souscategory")}
                    >
                      <option>Choisis une sous-catégorie</option>
                      {props.ListSC.filter((sous) => {
                        if (sous.category === data.category) {
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
              )}
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
                    value={data.description}
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
                    name="dateDebut"
                    min={DatetoCheck}
                    value={data.dateDebut}
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
                    name="dateFin"
                    min={data.dateDebut || DatetoCheck}
                    value={data.dateFin}
                    onChange={handleChange("dateFin")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <FormGroup>
                  <label className="form-control-label text-dark">
                    Selectionner responsable dépouillement
                  </label>
                  <Col>
                    <UncontrolledDropdown className="bg-white" size="sm">
                      {data.responsable.email ? (
                        <DropdownToggle caret>
                          <label className="form-control-label text-dark m-2">
                            {data.responsable.email}
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
            </Row>
            <Row>
              <Col className="text-center">
                <FormGroup>
                  <label className="custom-file-upload form-control-label btn border-info text-info">
                    Choisir un fichier
                    <i className=" mx-2 form-control-label far fa-upload text-md text-info "></i>
                    <Input
                      type="file"
                      multiple={true}
                      name="image"
                      accept=".jpeg, .png, .jpg"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <>
                {ShowImg && (
                  <>
                    {data.image.map((img, index) => {
                      return (
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
                      );
                    })}
                  </>
                )}
              </>
            </Row>
            <Row className=" justify-content-center">
              <h4 className="text-success">
                {/* Votre offre va être publier directement ! */}
                {Text}
              </h4>
            </Row>
            <Row className=" justify-content-center">
              <Button
                className="my-4 btn-outline-success"
                color="dark"
                type="submit"
              >
                Confirmer
              </Button>
              <Button className="my-4 btn-outline-dark" onClick={() => reset()}>
                Reset
              </Button>
            </Row>
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
  isLoadingCreate: state.offres.loading_create,
  CodeMsg: state.offres.codeMsg,
});

const mapActionToProps = {
  create: addOffre,
  All: getAllCat,
  AllSous: getAllSousCat,
  AllUsers: getAllUsers,
};

export default connect(mapStateToProps, mapActionToProps)(Offre);
