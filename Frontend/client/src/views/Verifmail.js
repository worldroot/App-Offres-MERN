import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    NavbarBrand,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container
  } from "reactstrap";
  
  import React, { useEffect, useState } from 'react';
  import AuthNavbar from "components/Navbars/AuthNavbar.js";
  import AuthFooter from "components/Footers/AuthFooter.js";
  import 'components/Loading/404.css'
  import { Redirect, useParams } from 'react-router-dom'
  import axios from "axios";
  
const VerifMail = () => {
    
    const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5001/api/access/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
  
    return (
      <>
          <div className="main-content">
          <AuthNavbar />
          <div className="header bg-red py-7 py-lg-8">
           
  
            {/* Content */}
            { !validUrl && (
            <>
              <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                   
              <section id="not-found">
                    <div id="title">Error Page</div>
                    <div className="circles">
                    <h1>404<br/>
                    <small>PAGE NOT FOUND</small>
                    </h1>
                    <span className="circle big"></span>
                    <span className="circle med"></span>
                    <span className="circle small"></span>
                    </div>
                </section>
  
  
              </Row>
              </Container>
  
              
              </>
  
            )}
  
            { validUrl && (
  
            <Container classeName="mt--8 pb-5">
            <Row className="justify-content-center">
              <Col>
                    <br></br>
                    <h1 className="text-center text-white">Votre compte a été activé avec succès</h1>
                    <h1 className="text-center text-white">Félicitations</h1>
                    <br></br>
                    <h1 className="text-center text-white"><i className="far fa-check-circle fa-fw fa-3x text-white"></i></h1>
                    <br></br>
                    <div className="text-center">
                        <a href="/login">
                            <Button className="my-4 btn-outline-white" type="submit">
                            Go to Login
                            </Button>
                        </a>
                    </div>
                    <br></br>
              </Col>
                  
              
            </Row>
            </Container>
            )}
  
          </div>   
          <AuthFooter />    
        </div>
  
      </>
    );
  };
  
  const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
  });
  
  export default VerifMail;