import React, { Component } from 'react'
import { getPosts } from '../actions/index'
import { connect } from 'react-redux';
import { SearchUserPost } from './SearchUserPost';
import DeletePost from './DeletePost';
import EditPost from './EditPost';


class Posts extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.authReducer
    console.log(isAuthenticated)
    if (isAuthenticated) {
      this.props.getPosts()
    }
  }


  render() {
    const { posts } = this.props.postreducer
    console.log(posts)

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
              {/* <Comment id={value.id}/>
              <PostRate id={value.id}/> */}
              {/* comments:
              {value.comments.map(value, index)=>(
                <li key = {index}>
                  
                </li>
              )} */}
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
