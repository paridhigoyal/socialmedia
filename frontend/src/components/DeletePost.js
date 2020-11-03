import { connect } from "react-redux";
import { deletePost } from '../actions/index'
import React from 'react'

const DeletePost = (id) => {
  // console.log(id)
  return (<button onClick={() => deletePost(id)}>Delete Post</button>)
}
const mapStateToProps = ({ authReducer, postreducer }) => {
  return {
    authReducer,
    postreducer
  }
}
const mapDispatchToProps = dispatch => ({

  deletePost: (id) => dispatch(deletePost(id))

})


export default connect(mapStateToProps, mapDispatchToProps)(DeletePost)