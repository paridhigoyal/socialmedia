/** CommentRate component consists of like and dislike functionality. 
 * one can like , dislike and undo like and dislike the comment */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeCommentLike, updateCommentLike, deleteCommentLike, getPosts } from '../actions/index'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

export class PostRate extends Component {
  constructor(props) {
    super(props);
    this.State = {
      like: false
    }

  }
  componentDidMount(){
    this.props.getPosts();
  }

  makeLike2 = (like) => {
    const values = {
      rated_comment: this.props.value.id,
      rated_by: this.props.pk,
      liked: like
    }
    this.props.makeCommentLike(values)
    this.props.getPosts()
  }

  updateLike2 = (likeType, id) => {
    const values = {
      liked: likeType,
    }
    this.props.updateCommentLike(values, id)
    this.props.getPosts()
  }
  deleteLike = (id) => {
    this.props.deleteCommentLike(id)
    this.props.getPosts()
  }

  render() {

    const like = this.props.value.like.find((liked) => this.props.pk === liked.rated_by)
    
    return (
      <div>
        {like &&
          <div>
            {like.liked && <div>
              <ThumbUpIcon onClick={() => this.deleteLike(like.id)}
                variant="contained" color="primary" />{this.props.value.likes_count}
                &nbsp;
                <ThumbDownAltOutlinedIcon  onClick={() => this.updateLike2(false, like.id)}
                variant="contained"  / >{this.props.value.dislikes_count}
             
            </div>}

            {!like.liked && <div>
              <ThumbUpAltOutlinedIcon onClick={() => this.updateLike2(true, like.id)}
                variant="contained" />{this.props.value.likes_count} &nbsp;
             
              <ThumbDownIcon onClick={() => this.deleteLike(like.id)}
                variant="contained" color="primary" />{this.props.value.dislikes_count}
               
            </div>}
          </div>
        }

        {!like && <div>
            <ThumbUpAltOutlinedIcon onClick={() => this.makeLike2(true)} variant="contained" /> &nbsp;
            {this.props.value.likes_count} &nbsp;
            <ThumbDownAltOutlinedIcon onClick={() => this.makeLike2(false)} variant="contained" /> &nbsp;
            {this.props.value.dislikes_count}
        </div>}
      </div>
    )
  }
}

export default connect(null, { makeCommentLike, updateCommentLike, deleteCommentLike, getPosts })(PostRate)
