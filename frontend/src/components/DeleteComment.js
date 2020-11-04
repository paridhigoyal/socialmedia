import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment, getPosts } from '../actions/index'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

class DeleteComment extends Component {
  constructor(props) {
    super(props);
  }

  // handleOnSubmit = async (event) => {
  //   event.preventDefault()
  //   console.log(this.props.id)
  //   await this.props.deleteComment(this.props.id)
  //   await this.props.getPosts()
  // }

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleOnSubmit}> */}
        {/* <button onClick={() => { deleteComment(this.props.id) }}>Delete Comment</button> */}
        <DeleteForeverRoundedIcon onClick={(event) => { this.props.deleteComment(this.props.id) }} variant="contained" color="secondary" />
        {/* </form> */}
      </div>
    )
  }
}

export default connect(null, { deleteComment, getPosts })(DeleteComment)