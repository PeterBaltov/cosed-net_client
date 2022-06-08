import React from 'react';
import { Button, Col, Row, Container, Jumbotron } from 'react-bootstrap';

// The Uploading component is responsible for displaying the Uploading page of the Web Application
  class Upload extends React.Component {  
    constructor(props) {
      super(props)
      this.sendData = props.uploadData;
      this.handleTesting = props.handleTesting;
      this.state = {
        /*
        The component's state is responsible for storing the following:
        - preview: the image that is being uploaded
        - fileName: the name of the image
        - open: a boolean value that determines whether the results are displayed
        - width: the width of the window in pixels
        - height: the height of the window in pixels
        */
          preview: props.preview,
          fileName: props.fileName,
          open: false,
          userImgHeight: false,
          width: 0,
          height: 0
      }
    }
    
    updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    // This function is responsible for modifying the state of the component
    // when the user uploads an image based on the image's height
    getUpdatedUserImgHeight = () => {
      let userImg = document.getElementById('userImg');
      this.setState({ userImgHeight: userImg.height });
    }
    
    // This function is responsible for mounting the state of the component
    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();

      let userImg = document.getElementById('userImg');
      if(!userImg) {return 0}
      userImg.onload = () => this.setState({ userImgHeight: userImg.height })
      
      window.addEventListener('resize', this.getUpdatedUserImgHeight);
      this.getUpdatedUserImgHeight();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.getUpdatedUserImgHeight);
      window.removeEventListener('resize', this.updateDimensions);
      // Particles.pauseAnimation();
    }

    shouldComponentUpdate(nextProps, nextState) {
      if ((nextState.userImgHeight !== this.state.userImgHeight) || (nextState.open !== this.state.open) || (nextState.width !== this.state.width)) {
        return true;
      } else {
        return false;
      }
    }

    render() {
      return(
          <>
                <Jumbotron className="vertical-center bg-transparent p-0">
                  <Container>   
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={1} xl={1}></Col>
                        <Col xs={12} sm={12} md={12} lg={10} xl={10} className="upload-card light-color-bg dark-color-text">
                          <h3 className="text-center">Analyze Retinal Image</h3>
                            <Row>
                                  {this.state.preview ? <img id="userImg" src={this.state.preview} alt="preview img"/> : <h1>Please Upload Correct Format</h1>}
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Button style={{width: "100%"}} href="/">Reset</Button>
                                </Col>
                                <Col xs={6}>
                                    <Button style={{width: "100%"}} onClick={this.sendData}>Analyse</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                  </Container>
                </Jumbotron>
          </>
      );
    }
  }
  export default Upload;