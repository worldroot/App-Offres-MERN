import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";

import React, { useEffect, useState } from "react";
import { Demandesuser, deleteDem } from "redux/offres/offreActions";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { OffremsURL } from "helpers/urls";
import "../../components/Loading/loading.css";

const DemandesByUser = ({ ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.All();
  }, []);

  const [Titre, setTitre] = useState("l");

  const onDL = (id) => {
    const onSuccess = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
    if (window.confirm("Êtes-vous sûr ?")) dispatch(deleteDem(id, onSuccess));
  };

  return (
    <>
      <Card className="bg-secondary shadow fixed-top">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0 text-red">Vos demandes</h3>
            </Col>
            <Col className="text-right" xs="4">
              {/*  <Button
                color="btn btn-outline-dark"
                onClick={() => props.setShow(false)}
                size="sm"
              >
                Annuler
              </Button> */}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {props.List.length === 0 ? (
            <div className="text-center">
              <h2 className="mb-0 text-dark">Aucune demande</h2>
            </div>
          ) : Titre === "" ? (
            <div className="text-center">
              <div id="loading"></div>
            </div>
          ) : (
            <Table
              className="align-items-center table-flush bg-transparent"
              responsive
            >
              <thead className="text-gray">
                <tr>
                  <th scope="col">Offre</th>
                  <th scope="col">Date de creation</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="text-dark">
                {props.List.map((dm, index) => {
                  return (
                    <tr key={index}>
                      <td>{dm.offre}</td>
                      <td>{dm.createdAt.substring(0, 10)}</td>
                      <td>
                        <Button
                          className="btn btn-outline-danger"
                          size="sm"
                          onClick={() => onDL(dm._id)}
                        >
                          Annuler
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => ({
  List: state.offres.demandes,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: Demandesuser,
};

export default connect(mapStateToProps, mapActionToProps)(DemandesByUser);
