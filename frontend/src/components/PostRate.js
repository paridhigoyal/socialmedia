import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon';
// import { makeStyles } from '@material-ui/core/styles';
import { makeLike, updateLike, deleteLike } from '../actions/index'

export class PostRate extends Component {



  render() {

    const like = this.props.value.likes.find((liked) => this.props.pk === liked.rated_by)
    const makeLike2 = (like) => {
      // console.log('abc')
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

                <button onClick={() => this.props.deleteLike(like.id)} >
                  Unlike
                  </button>
                <button onClick={() => updateLike2(false)} >
                  Dislike
                    </button>
              </div>}

            {!like.liked &&
              <div>
                <button onClick={() => updateLike2(true)} >
                  Like
                    </button>
                <button onClick={() => this.props.deleteLike(like.id)}  >
                  UnDislike
                    </button>
              </div>}
          </div>
        }

        {!like && <div>
          <button onClick={() => makeLike2(true)}> Like Button </button>
          <button onClick={() => makeLike2(false)}>Dislike Button </button>
        </div>}
      </div>
    )
  }
}

export default connect(null, { makeLike, updateLike, deleteLike })(PostRate)
