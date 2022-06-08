// import logo from './logo.svg';
// import './styles/App.css';
import React from 'react';
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'
import Upload from '../components/Uploading'
import Loading from '../components/Loading'
import Results from '../components/Results'

import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


/*
The App component is responsible for displaying the entire application
by including the following components:
    - Navigation 
    - Landing
    - Uploading
    - Loading
    - Results

This logic of sending and receiving data from the server-side has been partially adopted from 
my previous React JS User Interface implementation applied 
in CS3528 Software Engineering and Professional Practice
*/
class Home extends React.Component {
  constructor(props) {
      super(props);
      this.handleImageSelection = this.handleImageSelection.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      this.abortRequest = this.abortRequest.bind(this);
      this.abortController = new AbortController();
      this.getWidth = this.getWidth.bind(this);
      /*
        The state of the App component is defined as an object that has the following properties:
            - uploadedImg: boolean to indicate if the user has uploaded an image
            - receivedData: the data that would have been send from the server
            - loading: boolean to indicate if the app is loading (waiting for the server to respond)
            - error: the error that would have been thrown if the server did not respond
            - imgFile: the file that the user uploaded
            - base64: the base64 representation of the image
            - width: the width of the current window
            - height: the height of the current window
      */
      this.state = {
          uploadedImg : false,
          receivedData: null,
          loading: false,
          error: null,
          imgFile: null,
          base64: null,
          width: 0,
          height: 0
      }
  }

  // This function is called to receive the current window's width
  getWidth() {
      return this.state.width;
  }
  
  // This function is called whenever the window is resized
  updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });

  };
   
  // This function is called when the component is mounted and it sets the window's width and height
  // by also setting the window's background color to rgb(206, 231, 253)
  componentDidMount() {
      document.body.style.backgroundColor = "rgb(206, 231, 253)"
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    
  }

  // This function transforms the retinal image to a base64 string
  toBase64(file) {
      return new Promise((res,rej) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => res(reader.result);
          reader.onerror = error => rej(error);
      })
  }

  // This function handles the uploading aspect of the image by
  // calling the toBase64 function and then setting the state of the App component
  // This would be done in an asynchronous manner. 
  async handleImageSelection(event) {
          let preview = URL.createObjectURL(event.target.files[0]);
          let imgFile = event.target.files[0];
          let base64 = await this.toBase64(imgFile);
          console.log(base64)
          this.setState({
              uploadedImg: true,
              previewImg: preview,
              base64: base64,
              imgFile: imgFile
          });
  }

  // This function send the base64 string to the server in a JSON format
  // This function is called when the user clicks the upload button
  // This function also awaits for the server's response 
  // and updates the state of the App component accordingly
  handleUpload() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json' );
      headers.append('Accept', 'application/json');
      headers.append('Origin','https://89.215.222.118:443/upload');
      this.setState({loading: true})
      console.log('Making post request');
      // Change this location once the server-side implementation has
      // been deployed to a remote or cloud service provider
      fetch('https://89.215.222.118:443/upload', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ img: this.state.base64 }),
          signal: this.abortController.signal
      })
      .then(json=> {
          if (!json.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
          }
          return json.json();
      })
      .then(res=>{
          console.log(res);
          this.setState({receivedData: res})
      })
      .catch(e=>{
          if(e.name === "AbortError") {
              console.log("aborted!!");
          }else{
              console.log(e);
              this.setState({error: e});
          }
      })
  }

  // This function aborts the request to the server
  // if there is a HTTP error
  abortRequest() {
      this.abortController.abort();
      this.setState({loading: false})
  }
  
  /* The Following sections renders the different components 
  based on the current two states:
    - loading
    - uploadedImg

  */
  render() {
      return (
          <div>
          <div id="landing-background">
          {(<Navigation/>)}
            {/* If the user has not uploaded an image yet, this renders the Landing page*/}
            {(!this.state.loading && !this.state.uploadedImg) && (
                <Landing handleImageSelection={this.handleImageSelection}/>
            )}
            {/* If the user has has clicked on the Upload Button, the renders the Upload page
                which provides a preview of the retinal image and the option to reset the chosen image*/}
            {(!this.state.loading && this.state.uploadedImg) && (
                <Upload preview={this.state.previewImg} uploadData={this.handleUpload}/>
            )}
            {/* If the user has has clicked on the Analyse Button, the Loading Page is triggered 
            util the response of the server is received*/}
            {(this.state.loading && !this.state.receivedData) && (
                <Loading/>
            )}
            {/* Once the data from the server is received, the Results Page is rendered */}
            {(this.state.receivedData) && (
                <Results receivedData={this.state.receivedData} getWidth={this.getWidth}/>
            )}
            </div>
            <div>
                {/* {(!this.state.loading && !this.state.uploadedImg) && (
                    <Footer/>
                )}           */}
            </div>
          </div>
          
      )
  }

}

export default Home;
