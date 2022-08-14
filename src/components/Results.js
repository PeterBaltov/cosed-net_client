import React from 'react'
// import DarkLogoPrint from '../img/logo-dark.png';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

/*
  The following class represents the Results Page where the response from the server is displayed
 */
class Results extends React.Component {
    constructor(props){
        super(props);
        this.setCurrentTab = this.setCurrentTab.bind(this);
        this.getToday = this.getToday.bind(this);
        /*
        The following state is coporised of the following:
        - results: The JSON object send from the server
        - resultImgHeight: The height of the result image
        - width: The width of the window
        - height: The height of the window
        - currentTab: The current tab that is selected
        - detailsData: The data that is displayed in the details tab

        */
        this.state = {
            result: this.props.receivedData,
            detailsData: null,
            getWidth: this.props.getWidth,
            resultImgHeight: false,
            width: 0,
            height: 0,
            currentTab: 'home'
        }
    }
    // This function is keeping track of which tab is selected
    // The default tab is the home tab
    setCurrentTab(newTab){
        this.setState({currentTab: newTab});
    }

    // This function is used to get the updated height and width of whole Result page
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    // This function is used to get the updated height of the result image 
    getUpdatedResultImgHeight = () => {
        let resultImg = document.getElementById('result-image');
        this.setState({ resultImgHeight: resultImg.height });
      }
    
    // This function is used to load and render the Results Component once
    // the server has responded with the JSON object
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();

        let resultImg = document.getElementById('result-image');

        resultImg.onload = () => this.setState({ resultImgHeight: resultImg.height })
        
        window.addEventListener('resize', this.getUpdatedResultImgHeight);
        this.getUpdatedResultImgHeight();
    }

    // This function is display the current data
    getToday() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = dd + '/' + mm + '/' + yyyy;

        return today;
    }
    

    render() {
        return(
            <>
                <Jumbotron className="vertical-center bg-transparent p-0">
                    <Container>   
                        <Row>
                            <Col xs={12} className="result-page p-0">
                                <div className="result-card light-color-bg dark-color-text">
                                    <Row className="print-header">
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        {/* LOGO */}
                                        </Col>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="text-right">
                                            <b>{this.getToday()}</b>
                                        </Col>
                                    </Row>
                                    
                                    <h2 className="text-center results-overview-text pb-1">Results Overview</h2>
                                    
                                    {/* The Classification Results */}
                                    <h3 className="text-center classification-head pb-1"><b>Classification</b></h3>
                                    <h3 className="text-center pb-1">The Retinal Image has been Classified to have 
                                    <br/>
                                     Diabetic Retinopathy Level
                                     <br/> 
                                     <b className="classification">Level {this.state.result.classification}</b></h3>
                                    <hr className="line" />

                                    {/* The Classification Results */}
                                    <h3 className="text-center segmentation-text pb-1"><b>Segmentation</b></h3>
                                    <Row className="d-flex justify-content-center result-preview" >
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6} >
                                        {/* Hard Exudates */}
                                                <h3 className="text-center image-text-center pb-1">Hard Exudates</h3>
                                                <img src={`data:image/jpeg;base64, ${this.state.result.img_EX}`} id="result-image" alt="result"/>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                        {/* Hemorrhages */}
                                                <h3 className="text-center image-text-center pb-1">Hemorrhages</h3>
                                                <img src={`data:image/jpeg;base64, ${this.state.result.img_HE}`} id="result-image" alt="result"/>
                                        </Col>                                        
                                    </Row>
                                    <Row className=" d-flex justify-content-center result-preview">
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                        {/* Microaneurysms */}
                                                <h3 className="text-center image-text-center pb-1">Microaneurysms</h3>   
                                                <img src={`data:image/jpeg;base64, ${this.state.result.img_MA}`} id="result-image" alt="result"/>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                        {/* Soft Exudates */}
                                                <h3 className="text-center image-text-center pb-1">Soft Exudates</h3>
                                                <img src={`data:image/jpeg;base64, ${this.state.result.img_SE}`} id="result-image" alt="result"/>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {/* The following provided the user with the possibility to print the results */}
                        <Row className="d-flex justify-content-center">
                            <label className="pdf-file-download" onClick={() => window.print()}>
                                <i className="pdf-file-icon"></i>
                                <span className="pdf-file-text">Download Analysis</span>    
                            </label>
                        </Row>
                    </Container>
                </Jumbotron>
            </>
        )
    }
}

export default Results;
