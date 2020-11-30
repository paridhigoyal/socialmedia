/** AddComment consist of form having fields named label as comment which is used
 * to give comment on a post, Add Comment button will open form for doing comment*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, getPosts } from '../actions/index'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import CommentIcon from '@material-ui/icons/Comment';

export class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: {
        id: '',
        content: '',
        user: this.props.authReducer.user.username,
        commented_post: this.props.id,
        commented_at: ''

      }
    }
    this.onInputChange = this.onInputChange.bind(this);
  }


  onInputChange = (event) => {
    switch (event.target.name) {
      case 'content':
        this.setState({
          commentData: {
            ...this.state.commentData,
            content: event.target.value
          }
        })
        break;
      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.state.commentData)
    this.props.getPosts()

  }

  showForm = () => {
    return (<div>
      <form onSubmit={this.handleSubmit} >
        <FormControl>
          <InputLabel>Comment</InputLabel>
          <Input type='text'
            name='content'
            value={this.state.commentData.content}
            onChange={this.onInputChange}
            placeholder="comment here..." /><br />
        </FormControl>
        <br /><br />
        <Button type='submit' onClick={this.handleSubmit}
          disabled={!this.state.commentData.content}
          variant="contained" color="primary">
          <CommentIcon />Comment
          </Button>
      </form>
    </div>
    );
  }
  render() {
    return (
      <div>
        <Button type="button" variant="contained"
          startIcon={<AddCommentOutlinedIcon />} onClick={() =>
            this.setState({ showForm: true })}> Comment</Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

const mapStateToProps = ({ authReducer, postreducer, commentReducer }) => {
  return {
    authReducer,
    postreducer,
    commentReducer

  }
}


export default connect(mapStateToProps, { addComment, getPosts })(AddComment)
