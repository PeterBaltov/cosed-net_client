import React from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import '../styles/Loading.css';

/*
  The following represents the Loading Page section of the User Interface
 */
class Loading extends React.Component {  
    constructor(props) {
      super(props)
      this.sendData = props.uploadData;
      // Inheriting the previous state from the parent component 
      this.state = {
          preview: props.preview
      }
    }
  
    render() {
      return(
          <>
          {/* The Jumbotron Component has been utilizes for further symmetry within the UI 
              It should be noted that in newer version of 'react-bootstrap' this Component has been detracted*/}
            <Jumbotron className="vertical-center bg-transparent p-0">
              <Container>
                <Row>
                  <Col xs={1} sm={2} md={3} lg={4} xl={4}></Col>
                  <Col xs={10} sm={8} md={6} lg={4} xl={4} className="loading-card text-center">
                  {/* /* The styling and animation of the loading page has been */
                  /* adopted from the following  link:*/
                  /* https://icons8.com/cssload/en/spinners */}
                    <div className="windows8">
                      <div className="wBall" id="wBall_1">
                        <div className="wInnerBall"></div>
                      </div>
                      <div className="wBall" id="wBall_2">
                        <div className="wInnerBall"></div>
                      </div>
                      <div className="wBall" id="wBall_3">
                        <div className="wInnerBall"></div>
                      </div>
                      <div className="wBall" id="wBall_4">
                        <div className="wInnerBall"></div>
                      </div>
                      <div className="wBall" id="wBall_5">
                        <div className="wInnerBall"></div>
                      </div>
                    </div>
                    <h4 className="relative">Loading...</h4>

                  </Col>
                  <Col xs={1} sm={2} md={3} lg={4} xl={4}></Col>
                </Row>
              </Container>
            </Jumbotron>
          </>
      );
    }
  }
  
  
  export default Loading;