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
import { connect } from "react-redux";
import { toast } from "react-toastify";
import React, { Fragment, useState, useEffect } from "react";
import { addOffre } from "redux/offres/offreActions";
import { getAllCat, getAllSousCat } from "redux/cat/catActions";
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
};

const Offre = ({ ...props }) => {
  const ImgStyle = {
    width: "100px",
    height: "100px",
  };

  const [data, setData] = useState(initialFieldValues);
  const {
    titre,
    description,
    image,
    dateDebut,
    dateFin,
    souscategory,
    category,
    prixdebut,
  } = data;

  useEffect(() => {
    props.All();
    props.AllSous();
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
    //const base64 = await convertToBase64([...e.target.files]);
    const filePathsPromises = image;
    files.forEach((file) => {
      filePathsPromises.push(convertToBase64(file));
    });

    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => base64File);
    toast.info("Téléchargement d'images réussi");
    setShowImg(true);
    setData({ image: mappedFiles.reverse() });
    console.log(e.target.value);
  };

  const onDelete = (e) => {
    const filtered = image.filter((item, index) => index !== e);
    setData({ image: filtered });
  };

  const reset = async (e) => {
    resetForm();
    setShowList(false);
    setShowImg(false);

    const filePathsPromises = image;
    const filePaths = await Promise.resolve(filePathsPromises);
    setData({ image: filePaths });
    setData(initialFieldValues);

    //setData(image.splice(0,image.length))
  };

  console.log(image);

  const [ShowList, setShowList] = useState(false);
  const [ShowImg, setShowImg] = useState(false);
  var date = new Date();
  const DatetoCheck = date.toISOString().substring(0, 10);

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
                    value={titre}
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
                    min={1}
                    type="number"
                    step="0.1"
                    name="prixdebut"
                    value={prixdebut}
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
                    value={category}
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
                      value={souscategory}
                      onChange={handleChange("souscategory")}
                    >
                      <option>Choisis une sous-catégorie</option>
                      {props.ListSC.filter((sous) => {
                        if (sous.category === category) {
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
                    name="dateDebut"
                    min={DatetoCheck}
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
                    name="dateFin"
                    min={dateDebut || DatetoCheck}
                    value={dateFin}
                    onChange={handleChange("dateFin")}
                  />
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
              <>
                {ShowImg && (
                  <>
                    {image.map((img, index) => (
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
                  </>
                )}
              </>
            </Row>

            <div className="text-center">
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
  AllSous: getAllSousCat,
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  ListC: state.categories.categories,
  ListSC: state.categories.souscategories,
  isLoading: state.offres.loading,
  CodeMsg: state.offres.codeMsg,
});

export default connect(mapStateToProps, mapActionToProps)(Offre);
