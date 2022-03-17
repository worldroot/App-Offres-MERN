import {
    Button,
    Row,
    Col,
    Container
  } from "reactstrap";
  import {motion} from 'framer-motion'
  import React, { useEffect, useState } from 'react';
  import AuthNavbar from "components/Navbars/AuthNavbar.js";
  import PageNotFound from "components/Loading/PageNotFound";
  import 'components/Loading/404.css'
  import { useParams } from 'react-router-dom'
  import axios from "axios";
  import setAuthToken from 'helpers/authToken';

  import {toast} from 'react-toastify'
  
const VerifMail = () => {
    
  const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
        setAuthToken(param.token)
				const url = `http://localhost:5001/api/access/verify/${param.token}`;
				const { data } = await axios.get(url);
				//console.log(data);
				setValidUrl(true);
        toast.success('Félicitations')
			} catch (error) {
				console.log(error);
        toast.error("Quelque chose s'est mal passé !")
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
  
    return (
      <>
          <div className="main-content position-flex">

           
  
            {/* Content */}
            { !validUrl && (
            <>
              <div className="header bg-white py-7 py-lg-8"> 
                <PageNotFound/>
              </div> 
            </>
  
            )}
            
            { validUrl && (
            <>
              <AuthNavbar />
              <div className="header bg-red py-7 py-lg-8 w-100vh h-100vh"> 
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
                <Container classeName="mt--8 pb-5">
                <Row className="justify-content-center">
                  <Col>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{  duration: 1.5 }}>
                             <br></br>
                            <h1 className="text-center text-white">Votre compte a été activé avec succès</h1>
                            <h1 className="text-center text-white"></h1>
                            <br></br>
                            <h1 className="text-center text-white"><i className="far fa-check-circle fa-fw fa-3x text-white"></i></h1>
                            <br></br>
                            <div className="text-center">
                                <a href="/home">
                                    <Button className="my-4 btn-outline-white" type="submit">
                                    Home
                                    </Button>
                                </a>
                            </div>
                            <br></br>
                        </motion.div>  
                       
                  </Col>
                      
                  
                </Row>
                </Container>
              </div> 
            </>
             
            )}
  
            
         
        </div>
  
      </>
    );
  };
  
  const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
  });
  
  export default VerifMail;