import React, { Component } from 'react';
import { addPost } from '../actions/index';
import { connect } from 'react-redux';
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
    console.log(this.state.image.name, this.state.caption, this.state.image)
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('caption', this.state.caption);

    this.props.addPost(form_data)
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
          disabled={!this.state.image, !this.state.caption}
          variant="contained" color="secondary">
          Post
          </Button>
      </form>

    </div>
    )
  }
}
const mapStateToProps = ({ authReducer }) => {
  return {
    authReducer,

  }
}
export default connect(mapStateToProps, { addPost })(AddPost)
