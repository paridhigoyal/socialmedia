import React, { Component } from 'react'
import {Redirect,Link} from "react-router-dom";
// import Answer from './Answer'
import { getPosts } from '../actions/index'
import { connect } from 'react-redux';
// import Navbar from './Navbar';

class Posts extends Component {
  
  componentDidMount() {
    const { isAuthenticated } = this.props.authReducer
    console.log(isAuthenticated)
    if(isAuthenticated){
    this.props.getPosts()
}
  }

 
  render() {
    const { isAuthenticated } = this.props.authReducer
    const { posts } = this.props.postreducer
    console.log(posts)
    
    return (
      <div> 
      <h4>Welcome to Social Life!.</h4> 
      <ul> 
     
      <Link  to = {`/addpost`}>
    <button style={{ backgroundColor: '#b92b27', borderColor: '#b92b27' }}>
      Post Something...
    </button>
</Link>
  { posts.map((value, index )=> (
          
            <li key = { index }> 

              post by : {value.post_by.username}<br/>
              <div>
              <img src={value.image}></img><br/>
                 {value.caption}<br/>
                 </div>
              likecount : {value.like_count}
              dislikescount : {value.dislikes_count}
              comments_count: {value.comment_count}
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


const mapStateToProps = ({ authReducer, postreducer  }) => {
  return { 
      authReducer,
      postreducer
  }
}   

export default connect(mapStateToProps, { getPosts })( Posts);
