// reactstrap components
import { Button, Card, CardHeader, CardBody, Form, Row, Col } from "reactstrap";
// core components
import { connect, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { banUser } from "redux/users/userActions";
import useForm from "helpers/useForm";
const initialFieldValues = { banned: "" };

const BanUser = ({ ...props }) => {
  const dispatch = useDispatch();

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

  const validate = () => {
    let temp = { ...errors };
    temp.banned = values.banned ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((p) => p === "");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      resetForm();
    };
    if (validate()) {
      if (props.currentId !== 0) {
        props.update(props.currentId, values, onSuccess);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        props.setShowModal(false);
        resetForm();
      }
    }
  };

  const reset = (e) => {
    resetForm(), props.setCurrentIndex(-1);
  };

  const banned = values.banned;
  const [state, setState] = useState(banned);
  const toggleChecked = () =>
    setState({ state: (values.banned = !values.banned) });
  console.log(banned);

  return (
    <>
      <Card className="card-profile shadow">
        <Row className="justify-content-center">
          <Col className="order-lg-1" lg="2">
            <div className="card-profile-image">
              <a href="#" onClick={(e) => e.preventDefault()}></a>
            </div>
          </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <h3 className="mb-0">Etes-vous sûr de bannir {values.email} ?</h3>
        </CardHeader>
        <CardBody className="pt-0 pt-md-2">
          <Form role="form" onSubmit={onSubmit}>
            <div className="text-center">
              <select
                name="banned"
                size="sm"
                value={values.banned}
                onChange={handleInputChange}
                className="search-input input-group-alternative input-group-lg"
              >
                <option value="true">Compte Banni</option>
                <option value="false">Compte Non Banni</option>
              </select>
            </div>

            <div className=" text-center">
              <Button
                className="my-4 btn-outline-success"
                size="sm"
                color="dark"
                type="submit"
              >
                Confirmer
              </Button>
              <Button
                className="my-4 btn-outline-dark"
                size="sm"
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
  update: banUser,
};

const mapStateToProps = (state) => ({
  List: state.users.uslist,
});

export default connect(mapStateToProps, mapActionToProps)(BanUser);

/**
                          <select name="banned" 
                              size="sm" 
                              value={values.banned}
                              onChange={handleInputChange}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                               
                            <option value={values.banned}> {values.banned ? 'Compte Banni': 'Compte Non Banni'}</option>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                          
                         </select>  


                          <IOSSwitch  name="banned"
                                  onChange={ toggleChecked }
                                  checked={banned}
                                    >
                      </IOSSwitch>
   */
