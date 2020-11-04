import { connect } from "react-redux";
import { deletePost } from '../actions/index'
import React from 'react'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const DeletePost = (id) => {
  // console.log(id)
  return (
    <button onClick={() => deletePost(id)}>Delete Post</button>
    // <DeleteForeverRoundedIcon onClick={(event) => deletePost(id)} variant="contained" color="secondary" />
  )
}
// class DeleteComment extends Component {
//   constructor(props) {
//     super(props);
//   }

//   handleOnSubmit = async (event) => {
//     event.preventDefault()
//     console.log(this.props.id)
//     await this.props.deleteComment(this.props.id)
//     await this.props.getPosts()
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleOnSubmit}>
//           <button onClick={() => { deleteComment(this.props.id) }}>Delete Comment</button>
//         </form>
//       </div>
//     )
//   }
// }
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