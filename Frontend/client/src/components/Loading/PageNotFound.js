import {
    Button,
    Row,
    Col,
    Container,
    NavbarBrand
  } from "reactstrap";
  
  import React from 'react';
  import { Link } from 'react-router-dom'
  const ooredoo = require('../../assets/img/oored.png')
  import './404.css'

  
const PageNotFound = () => {
    
  
    return (
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                  <Col>
                    <div className="text-center">
                            <a href="/home">
                                <Button className="my-4 btn-outline-danger" type="submit">
                                Home
                                </Button>
                            </a>
                           
                          <div className="circles text-center fluid">
                            <p>404<br/>
                            <small>PAGE NOT FOUND</small>
                            </p>
                            <span className="circle big"></span>
                            <span className="circle med"></span>
                            <span className="circle small"></span>
                          </div>
                    </div>
                  </Col>   
                </Row>
              </Container>      
    );
  };
  

  export default PageNotFound;