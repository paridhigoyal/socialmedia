/** Posrrate component consists of like and dislike functionality. 
 * one can like , dislike and undo like and dislike the post */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { makeLike, updateLike, deleteLike, getPosts } from '../actions/index'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

export class PostRate extends Component {
  constructor(props) {
    super(props);
    this.State = {
      like: false
    }

  }

  makeLike2 = (like) => {
    const values = {
      rated_post: this.props.value.id,
      rated_by: this.props.pk,
      liked: like
    }
    this.props.makeLike(values)
    this.props.getPosts()
  }

  updateLike2 = (likeType, id) => {
    const values = {
      liked: likeType,
    }
    this.props.updateLike(values, id)
    this.props.getPosts()
  }
  deleteLike = (id) => {
    this.props.deleteLike(id)
    this.props.getPosts()
  }

  render() {

    const like = this.props.value.likes.find((liked) => this.props.pk === liked.rated_by)

    return (
      <div>
        {like &&
          <div>
            {like.liked && <div>
              <Button onClick={() => this.deleteLike(like.id)}
                variant="contained"  >
                Unlike
                  </Button>&nbsp;
                <Button onClick={() => this.updateLike2(false, like.id)}
                variant="contained" startIcon={<ThumbDownAltOutlinedIcon />}  >
                Dislike
                    </Button>
            </div>}

            {!like.liked && <div>
              <Button onClick={() => this.updateLike2(true, like.id)}
                variant="contained" startIcon={<ThumbUpAltOutlinedIcon />} >
                Like
                </Button>
              <Button onClick={() => this.deleteLike(like.id)}
                variant="contained"  >
                UnDislike
                </Button>
            </div>}
          </div>
        }

        {!like && <div>
          <Button onClick={() => this.makeLike2(true)}
            variant="contained" startIcon={<ThumbUpAltOutlinedIcon />}> Like </Button> &nbsp;
          <Button onClick={() => this.makeLike2(false)}
            variant="contained" startIcon={<ThumbDownAltOutlinedIcon />}>Dislike </Button>
        </div>}
      </div>
    )
  }
}

export default connect(null, { makeLike, updateLike, deleteLike, getPosts })(PostRate)
