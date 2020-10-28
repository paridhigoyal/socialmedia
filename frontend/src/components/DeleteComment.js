import React, { Component } from 'react'
import { connect } from 'react-redux'
import {deleteComment, getPosts} from '../actions/index'

class DeleteComment extends Component {
  constructor(props){
    super(props);
  }

  handleOnSubmit = async(event) => {
    event.preventDefault()
    console.log(this.props.id)
    await this.props.deleteComment(this.props.id)
    await this.props.getPosts()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
        <button onClick = {() => {deleteComment(this.props.id)}}>Delete Comment</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {deleteComment, getPosts})(DeleteComment)