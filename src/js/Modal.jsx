import React, {Component} from 'react';
import Button from './Button';
import Dropzone from 'react-dropzone';
import axios from 'axios';


class BlockingDiv extends Component{

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className = 'blockingDiv' onClick={this.props.close}> </div>
    )
  }
}

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      file: null
    }
  }

  openModal = () => {
    this.setState({isOpen: true});
  }

  closeModal = () => {
    this.setState({isOpen: false});
    this.state.files.length > 0 && this.setState({files: []}); //if we close the modal without uploading files, the files do not persist in the modal
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
  }

  //for now you can only upload one file at a time. I will change this hardcoded stuff soon.
  onUpload = () => {

    axios.get('pdf/upload', {
      document : this.state.files[0],
      courseId : '0',
      courseName : 'COEN331',
      userId : '2',
      username : 'daniel',
      fileName : this.state.files[0].name
    }).then(function (response) {
      console.log(response);
    }).catch(function (error){
      console.log(error);
    })
  }


    render() {
      return(
        <div>
          <Button func={this.openModal}/>{/*open the modal by clicking on the button, close by clicking on background*/}
          {this.state.isOpen && <BlockingDiv display={this.state.isOpen ? 'flex' : 'none'} close={this.closeModal}/>}
          <div className = 'uploadModal' style = {{display: this.state.isOpen ? 'flex' : 'none'}}>
            <div className = "modalTitle">
              <h1>Drag files to upload.</h1>
            </div>
            <div className = "modalBody">
              <Dropzone onDrop={this.onDrop} accept={'application/pdf,image/*'} multiple={false} />
              <p>Drag files here to upload. Accepted formats: PDF, JPG, PNG</p>
                {this.state.files ? <div>
                <div>{this.state.files.map((file, index) => <img key={index} src={file.preview} /> )}</div></div>
                 : <img src="./assets/images/book.svg"></img>}
              <Button className="uploadButton" label = "Upload" func={this.onUpload} />
            </div>
          </div>
        </div>
      );
    }
}

export default Modal;
