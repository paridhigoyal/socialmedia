/**Posts component is for showing posts ,  have add posts , 
 * delete post, edit post post button,show comments, add, edit and delete comment, 
 * postrating and search post  functionalities, */

import React, { Component } from 'react'
import { getPosts, deleteComment, deletePost } from '../actions/index'
import { connect } from 'react-redux';
import EditPost from './EditPost';
import AddComment from './AddComment';
import { Button } from '@material-ui/core';
import EditComment from './EditComment';
import PostRate from './PostRate';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';

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
      <div className='App' >
      <div >
        {(user !== undefined && user.pk) && <div>
          <ul >
            {posts.length === 0 && <h2>No posts available for this user</h2>}
            {posts !== undefined && posts.map((value, index) => (

              <li key={index} className='Div'>

                <h5> <b>{value.post_by.username} </b></h5>
                
                <div>
                  <img style={{ resizeMode: 'cover', width: 300, height: 200 }}
                    src={value.image} alt="abc"></img><br />
                  <b>{value.post_by !== undefined && value.post_by.username} </b> 
                  {value.caption}<br />
                  <h6 style={{ color: 'gray' }}> <DateRangeOutlinedIcon/> {value.posted_at} </h6> 
                </div>
              <div>
                {value.post_belongs_to_authenticated_user && 
                <Button type="button" variant="contained" 
                 startIcon={<DeleteForeverRoundedIcon/>}
                  onClick={() => { this.deletePost(value.id) }}>
                    DeletePost</Button> }
                    </div><br/>
                <div>
                {value.post_belongs_to_authenticated_user && <EditPost value={value} />}
                </div>
                <div>
                likes : {value.likes_count} &nbsp;
                dislikes : {value.dislikes_count} &nbsp;

                <PostRate value={value} pk={user.pk} />
                </div>
                <div>
                comments: {value.comments_count} <br />

                <AddComment id={value.id} />
                </div>
                <br />
                
              {value.comments_count!==0 && <b> comments.....</b>}
              <div>
                <ul>

                  {value.comments.map((data, index) =>
                    (

                      <li key={index}>

                        {data.content} 
                        {user.pk === data.user && <DeleteForeverRoundedIcon
                          onClick={() => { this.deleteComment(data.id) }}
                          variant="contained"  />}
                        {user.pk === data.user && <EditComment data={data} />}
                        <h6 style={{ color: 'gray' }}>{data.commented_at}</h6>

                      </li>
                    ))
                  }

                </ul>
                </div>

              </li>
            ))
            }
            <br />
          </ul>
        </div>
        }
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authReducer, postreducer, commentReducer }) => ({
  authReducer,
  postreducer,
  commentReducer
})

export default connect(mapStateToProps, { getPosts, deleteComment, deletePost })(Posts);
