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
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    
                    <p className="text-lead text-light">
                    </p>
                  </Col>
                  
  
                  
                </Row>
              </div>
            </Container>
  
            {/* Content */}
            { !validUrl && (
            <>
              <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                   
              <section id="not-found">
                    <div id="title">Error Page</div>
                    <div className="circles">
                    <p>404<br/>
                    <small>PAGE NOT FOUND</small>
                    </p>
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
                    
                    <div className="text-center">
                        <a href="/login">
                            <Button className="my-4 btn-outline-white" type="submit">
                            Login
                            </Button>
                        </a>
                    </div>
              
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