import React from "react";
import { Row, Form, Container } from 'react-bootstrap';

/*
The following class represents the Landing page
In this class the Upload Button is created which handles the upload of an retinal image
and only accept the following file formats: .jpg, .jpeg, .png

This style and layout of this landing page has been partially adopted from 
my previous React JS User Interface implementation applied 
in CS3528 Software Engineering and Professional Practice
*/

class Landing extends React.Component {  
    constructor(props) {
      super(props)
      this.handleChange = this.props.handleImageSelection
    }
  
    render() {
      return(
          <>
            <Container className="home-landing">
              <div className="d-flex justify-content-center">
                <div className="vertical-center-50">
                  <Row className="d-flex justify-content-center">
                    <span className="landing-caption rainbow-text">
                      Medical
                      <br />
                      Innovation
                    </span>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Form className="p-1" >           
                        <Form.Group>
                            <label className="thermal-file-upload">
                                <input type="file" onChange={this.handleChange} accept=".jpg, .jpeg, .png" />
                                <span className="thermal-file-text">Upload Retinal Image</span>    
                            </label>
                        </Form.Group>
                    </Form>
                  </Row>
                </div>
              </div>
            </Container>
          </>
      );
    }
  }
  
  
export default Landing;