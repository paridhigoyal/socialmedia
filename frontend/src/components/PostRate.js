import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { makeLike, updateLike, deleteLike } from '../actions/index'

export class PostRate extends Component {



  render() {

    const like = this.props.value.likes.find((liked) => this.props.pk === liked.rated_by)
    const makeLike2 = (like) => {
      const values = {
        rated_post: this.props.value.id,
        rated_by: this.props.pk,
        liked: like
      }
      console.log(values)
      this.props.makeLike(values)
    }
    const updateLike2 = (likeType) => {
      const values = {
        liked: likeType,
      }
      console.log(values)
      this.props.updateLike(values, like.id)
    }

    console.log("likes", like)
    return (
      <div>
        {like &&
          <div>
            {console.log(like.liked)}
            {like.liked &&
              <div>

                <Button onClick={() => this.props.deleteLike(like.id)}variant="contained" color="primary" >
                  Unlike
                  </Button>&nbsp;
                <Button onClick={() => updateLike2(false)}variant="contained" color="primary" >
                  Dislike
                    </Button>
              </div>}

            {!like.liked &&
              <div>
                <Button onClick={() => updateLike2(true)} variant="contained" color="primary">
                  Like
                    </Button>
                <Button onClick={() => this.props.deleteLike(like.id)} variant="contained" color="primary" >
                  UnDislike
                    </Button>
              </div>}
          </div>
        }

        {!like && <div>
          <Button onClick={() => makeLike2(true)}variant="contained" color="primary"> Like </Button> &nbsp;
          <Button onClick={() => makeLike2(false)}variant="contained" color="primary">Dislike </Button>
        </div>}
      </div>
    )
  }
}

export default connect(null, { makeLike, updateLike, deleteLike })(PostRate)
