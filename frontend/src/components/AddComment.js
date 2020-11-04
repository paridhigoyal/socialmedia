import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/index'

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
    console.log(this.state.commentData)
    this.props.addComment(this.state.commentData)
  }


  showForm = () => {

    return (<div>
      <form onSubmit={this.handleSubmit} >
        <input type='text'
          name='content'
          value={this.state.commentData.content}
          onChange={this.onInputChange}
          placeholder="comment here..." /><br />
        <button>Comment</button>
      </form>
    </div>
    );
  }
  render() {
    return (
      <div>
        <button type="button" onClick={() => this.setState({ showForm: true })}>Add Comment</button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}
const mapStateToProps = ({ authReducer }) => {
  return {
    authReducer,

  }
}

export default connect(mapStateToProps, { addComment })(AddComment)
