/** EditComment component is for editing comment consist of content
 *  field which is for commenting */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { editComment, getPosts } from '../actions/index'
import EditIcon from '@material-ui/icons/Edit';
import { FormControl, InputLabel, Input } from '@material-ui/core';

export class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: {
        id: this.props.data.id,
        content: this.props.data.content,
        user: this.props.data.user,
        commented_post: this.props.data.commented_post,
        commented_at: this.props.data.commented_at
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

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.editComment(this.props.data.id, this.state.commentData)
    await this.props.getPosts()
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
            placeholder="comment......." />
        </FormControl>

        <EditIcon onClick={this.handleSubmit} variant="contained"
          color="primary" />
      </form>
    </div>
    );
  }

  render() {
    return (
      <div>
        <EditIcon onClick={() => this.setState({ showForm: true })} variant="contained"
        /> {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editComment, getPosts })(EditComment)
