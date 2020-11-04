import React, { Component } from 'react'
import { getPosts } from '../actions/index'
import { connect } from 'react-redux';
import { SearchUserPost } from './SearchUserPost';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';
import PostRate from './PostRate';

// import media from '../../../media';


class Posts extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.authReducer
    // console.log(isAuthenticated)
    if (isAuthenticated) {
      this.props.getPosts()
    }
  }
  render() {
    const { posts } = this.props.postreducer
    const { pk } = this.props.authReducer.user
    // console.log(posts)
    return (
      <div>

        <SearchUserPost />
        <ul>
          {posts.map((value, index) => (

            <li key={index}>

              post by : {value.post_by.username}<br />
              <div>
                {/* {console.log(value.image)} */}
                <img style={{ resizeMode: 'cover', width: 300, height: 200 }}
                  src={value.image} alt="abc"></img><br />
                {value.caption}<br />
              </div>
              likes : {value.likes_count} &nbsp;
              dislikes : {value.dislikes_count} &nbsp;
              comments: {value.comments_count} <br />
              {value.post_belongs_to_authenticated_user && <DeletePost id={value.id} />}
              {value.post_belongs_to_authenticated_user && <EditPost value={value} />}
              <br /><b>comments.....</b>
              {value.comments.map((data, index) => (
                <li key={index}>
                  {data.content} by {data.user}
                  {pk === data.user && <EditComment data={data} />}
                  {pk === data.user && <DeleteComment id={data.id} />}


                </li>
              ))}

              <PostRate value={value} pk={pk} />
              <AddComment id={value.id} />
            </li>
          ))
          }
          <br />
        </ul>
      </div>
    )
  }
}


const mapStateToProps = ({ authReducer, postreducer }) => {
  return {
    authReducer,
    postreducer
  }
}

export default connect(mapStateToProps, { getPosts })(Posts);
