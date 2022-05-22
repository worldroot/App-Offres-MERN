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
import "../../components/Loading/loading.css";

const DemandesByUser = ({ ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.All();
  }, []);

  const [Titre, setTitre] = useState("l");
  var date = new Date();
  const DatetoCheck = new Date(date.getTime());

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

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
                  <th scope="col">Titre d'offre</th>
                  <th scope="col">Date de creation</th>
                  <th scope="col">Etat</th>
                </tr>
              </thead>
              <tbody className="text-dark">
                {props.List.map((dm, index) => {
                  return (
                    <tr key={index}>
                      {dm.offre.status === "closed" && dm.properties.userInfos === user.email && (
                        <>
                          <td>{dm.offre.titre}</td>
                          <td>{dm.createdAt.substring(0, 10)}</td>
                          <td>{dm.etat}</td>
                        </>
                      )}
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
