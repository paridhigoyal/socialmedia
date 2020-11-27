/**Posts component is for showing posts ,  have add posts , 
 * delete post, edit post post button,show comments, add, edit and delete comment, 
 * postrating and search post  functionalities, */

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
      this.props.getPosts()
    
  }
deleteComment=(id)=>{
  this.props.deleteComment(id)
  this.props.getPosts()
}
deletePost=(id)=>{
  this.props.deletePost(id)
  this.props.getPosts()
}


  render() {
    const { posts } = this.props.postreducer
    const { user } = this.props.authReducer;

    return (
      <>
        {(user !== undefined && user.pk) && <div>

          <SearchUserPost />
          <ul>
            {posts.length === 0 && <h2>No posts available for this user</h2>}
            {posts !== undefined && posts.map((value, index) => (

              <li key={index}>

                <h5> <b>{value.post_by.username} </b></h5>

                <div>
                  <img style={{ resizeMode: 'cover', width: 300, height: 200 }}
                    src={value.image} alt="abc"></img><br />
                  <b>{value.post_by !== undefined && value.post_by.username} </b> 
                  {value.caption}<br />
                </div>

                {value.post_belongs_to_authenticated_user && <DeleteForeverRoundedIcon
                  onClick={() => { this.deletePost(value.id) }} />}

                {value.post_belongs_to_authenticated_user && <EditPost value={value} />}

                likes : {value.likes_count} &nbsp;
                dislikes : {value.dislikes_count} &nbsp;

                <PostRate value={value} pk={user.pk} />

                comments: {value.comments_count} <br />

                <AddComment id={value.id} />

                <br />
                <h6 style={{ color: 'darkgray' }}>{value.posted_at}</h6>
              {value.comments_count!==0 && <b> comments.....</b>}

                <ul>

                  {value.comments.map((data, index) =>
                    (

                      <li key={index}>

                        {data.content} 
                        {user.pk === data.user && <DeleteForeverRoundedIcon
                          onClick={() => { this.deleteComment(data.id) }}
                          variant="contained" color="secondary" />}
                        {user.pk === data.user && <EditComment data={data} />}
                        <h6 style={{ color: 'darkgray' }}>{data.commented_at}</h6>

                      </li>
                    ))
                  }

                </ul>

              </li>
            ))
            }
            <br />
          </ul>
        </div>
        }
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
