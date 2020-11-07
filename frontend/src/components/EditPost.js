import React, { Component } from 'react'
import { connect } from 'react-redux';
import { editPost } from '../actions/index'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
export class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {

      caption: this.props.value.caption,
      image: this.props.value.image,


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
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.image.name, this.state.caption, this.state.image)
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name)
    form_data.append('caption', this.state.caption)
    await this.props.editPost(this.props.value.id, form_data)
    // await this.props.getPosts()
  }
  showForm = () => {

    return (<div>
      <form onSubmit={this.handleSubmit} >
        <FormControl>
          <InputLabel>Upload Image:</InputLabel>
          <Input type='file'
            name='image'
            accept="image/png, image/jpeg"
            onChange={this.onInputChange} /><br />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Caption:</InputLabel>
          <Input
            type='text'
            name='caption'
            value={this.state.caption}
            onChange={this.onInputChange}
            placeholder="caption for the image" /><br />
        </FormControl>
        <br />
        <Button disabled={!this.state.image, !this.state.caption}
          type='submit' onClick={this.handleSubmit} variant="contained" color="secondary">
          Update Post
    </Button>
      </form>
    </div>
    );
  }

  render() {
    return (
      <div>
        <Button type="button" variant="contained" color="secondary"
          onClick={() => this.setState({ showForm: true })}>Edit Post</Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editPost })(EditPost)
