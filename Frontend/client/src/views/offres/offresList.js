import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardBody,
  CardGroup,
} from "reactstrap";

import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { allOffres } from "redux/offres/offreActions";
import { connect } from "react-redux";

const Offres = ({ ...props }) => {
  useEffect(() => {
    props.All();
  }, []);

  const [Search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const Data = props.List;
  const offresPerPage = 5;

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className=" py-xl-9">
          {/* Content */}
          <Container className="mt--8  py-xl-7">
            <Row className="justify-content-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <h1 className="text-center text-red">Les appels d'offres</h1>
              </motion.div>
            </Row>
            <div className="text-center">

            <Form className="navbar-search navbar-search-dark mr-3x mb-2 mt-2">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative border-dark">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search text-dark" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="text-dark"
                    type="text"
                    onChange={(event) => {
                      setSearch(event.target.value), setCurrentPage(1);
                    }}
                  />
                </InputGroup>
              </FormGroup>
            </Form>

            </div>
            <Row xs={1} md={3} className="g-4">
              {Data.map((of, index) => {
                return (
                  <Fragment key={index}>
                    <Col>
                      <Card className="m-2 bg-white">
                        <CardBody className="text-dark">
                          <div className="text-center pb-2">
                            <img
                              className="img-fluid rounded shadow avatar avatar-lg w-50 h-50"
                              src={of.image[0]}
                              alt=""
                            />
                          </div>
                          <Row>
                            <Col>
                              <h3>{of.titre}</h3>
                              <small>Prix debut (dt): {of.prixdebut}</small>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
          </Container>
        </div>

        <AuthFooter />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.offres.offres,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: allOffres,
};

export default connect(mapStateToProps, mapActionToProps)(Offres);
