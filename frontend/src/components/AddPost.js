/** AddPost component consist of fields image and caption having image as file 
 * type which is used to upload a file and caption is for giving captions related to image..
 * For adding post one should click on add post button after uploading image and
 *  giving some good captions....*/

import React, { Component } from 'react';
import { addPost, getPosts } from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';

export class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      image: null,

    }
    this.onInputChange = this.onInputChange.bind(this);
  }


  onInputChange = (event) => {
    switch (event.target.name) {
      case 'image':
        this.setState({
          image: event.target.files[0]
        })
        break;
      case 'caption':
        this.setState({
          caption: event.target.value
        })
        break;
      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('caption', this.state.caption);
    this.props.addPost(form_data)
    this.props.getPosts()
  }

  render() {
    return (<div className="container">
      <form onSubmit={this.handleSubmit}>
        <FormControl>
          <InputLabel>Upload Image:</InputLabel>
          <Input type='file'
            name='image'
            accept="image/png, image/jpeg"
            onChange={this.onInputChange} required /><br />
        </FormControl><br />
        <FormControl>
          <InputLabel>Caption</InputLabel>
          <Input type='text'
            name='caption'
            value={this.state.caption}
            onChange={this.onInputChange}
            placeholder="caption for the image" /><br />
        </FormControl>
        <br /><br />
        <Button type='submit' onClick={this.handleSubmit}
          disabled={!this.state.image}
          variant="contained" color="secondary">
          Post
          </Button>
      </form>

    </div>
    )
  }
}

const mapStateToProps = ({ authReducer, postreducer }) => {
  return {
    authReducer,
    postreducer

  }
}

export default connect(mapStateToProps, { addPost, getPosts })(withRouter(AddPost));
