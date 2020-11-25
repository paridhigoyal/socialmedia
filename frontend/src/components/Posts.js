import React, { Component } from 'react'
import { getPosts, deleteComment, deletePost } from '../actions/index'
import { connect } from 'react-redux';
import SearchUserPost from './SearchUserPost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';
import PostRate from './PostRate';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

class Posts extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.authReducer
    if (isAuthenticated) {
      this.props.getPosts()
    }
  }
  render() {
    const { posts } = this.props.postreducer
    const { user } = this.props.authReducer;

    return (
      <>
        {(user !== undefined && user.pk) && <div>

          <SearchUserPost />
          <ul>
            {posts !== undefined && posts.map((value, index) => (
              <li key={index}>
                <h5> <b>{value.post_by.username} </b></h5>
                <div>
                  <img style={{ resizeMode: 'cover', width: 300, height: 200 }}
                    src={value.image} alt="abc"></img><br />
                  <b>{value.post_by !== undefined && value.post_by.username} </b> {value.caption}<br />
                </div>
                {value.post_belongs_to_authenticated_user && <DeleteForeverRoundedIcon
                  onClick={() => { this.props.deletePost(value.id) }} />}
                {value.post_belongs_to_authenticated_user && <EditPost value={value} />}
                likes : {value.likes_count} &nbsp;
              dislikes : {value.dislikes_count} &nbsp;
              <PostRate value={value} pk={user.pk} />
                comments: {value.comments_count} <br />
                <AddComment id={value.id} />
                <br /><b>comments.....</b>
                <ul>
                {value.comments.map((data, index) => (
                  <li key={index}>
                    {data.content} by {data.user}
                    {user.pk === data.user && <DeleteForeverRoundedIcon
                      onClick={() => { this.props.deleteComment(data.id) }}
                      variant="contained" color="secondary" />}
                    {user.pk === data.user && <EditComment data={data} />}
                  </li>
                ))}
                </ul>
              </li>
            ))
            }
            <br />
          </ul>
        </div>}
      </>
    )
  }
}

const mapStateToProps = ({ authReducer, postreducer, commentReducer }) => ({
  authReducer,
  postreducer,
  commentReducer
})

export default connect(mapStateToProps, { getPosts, deleteComment, deletePost })(Posts);
