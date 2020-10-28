import React, { Component } from 'react'
import { getPosts } from '../actions/index'
import { connect } from 'react-redux';
import { SearchUserPost } from './SearchUserPost';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';


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

    return (
      <div>

        <SearchUserPost />
        <ul>

          {/* <Nav/> */}
          {posts.map((value, index) => (

            <li key={index}>

              post by : {value.post_by.username}<br />
              <div>
                <img src={value.image}></img><br />
                {value.caption}<br />
              </div>
              likecount : {value.like_count}
              dislikescount : {value.dislikes_count}
              comments_count: {value.comment_count}
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


              <AddComment id={value.id} />
            </li>
          ))
          }
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
