import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { makeLike, updateLike, deleteLike } from '../actions/index'
import { setLike } from '../actions/setState'

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
    this.props.setLike(values)
    this.props.makeLike(values)
  }
  updateLike2 = (likeType, id) => {
    const values = {
      liked: likeType,

    }
    this.props.updateLike(values, id)
  }

  render() {

    const like = this.props.value.likes.find((liked) => this.props.pk === liked.rated_by)

    return (
      <div>
        {like &&
          <div>
            {like.liked &&
              <div>

                <Button onClick={(event) =>  this.props.deleteLike(like.id)} variant="contained" color="primary" >
                  Unlike
                  </Button>&nbsp;
                <Button onClick={(event) => this.updateLike2(false, like.id)} variant="contained" color="primary" >
                  Dislike
                    </Button>
              </div>}

            {!like.liked &&
              <div>
                <Button onClick={(event) => this.updateLike2(true, like.id)} variant="contained" color="primary">
                  Like
                    </Button>
                <Button onClick={() => this.props.deleteLike(like.id)} variant="contained" color="primary" >
                  UnDislike
                    </Button>
              </div>}
          </div>
        }

        {!like && <div>
          <Button onClick={() => this.makeLike2(true)} variant="contained" color="primary"> Like </Button> &nbsp;
          <Button onClick={() => this.makeLike2(false)} variant="contained" color="primary">Dislike </Button>
        </div>}
      </div>
    )
  }
}

export default connect(null, { makeLike, updateLike, deleteLike, setLike })(PostRate)
