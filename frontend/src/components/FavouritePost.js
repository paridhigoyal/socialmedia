/** Posrrate component consists of like and dislike functionality. 
 * one can like , dislike and undo like and dislike the post */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unmarkPostFavourite, markPostFavourite, getPosts } from '../actions/index'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

export class FavouritePost extends Component {
  constructor(props) {
    super(props);
    this.State = {
      fav: false
    }

  }
  componentDidMount(){
    this.props.getPosts();
  }

  makeFav = (fav) => {
    const values = {
      favourite_post: this.props.value.id,
      favourite_by: this.props.pk,
      favourite: fav
    }
    this.props.markPostFavourite(values)
    this.props.getPosts()
  }

  deleteFav = (id) => {
    this.props.unmarkPostFavourite(id)
    this.props.getPosts()
  }

  render() {

     const fav = this.props.value.favourites.find((fav) => this.props.pk === fav.favourite_by)
    return (
      <div>
        {fav &&
          <div>
            {fav.favourite && <div>
              <FavoriteIcon onClick={() => this.deleteFav(fav.id)}
                variant="contained" color="primary" />
                &nbsp;   
            </div>}
          </div>
        }

        {!fav && <div>
            <FavoriteBorderOutlinedIcon onClick={() => this.makeFav(true)} variant="contained" />
        </div>}
      </div>
    )
  }
}

export default connect(null, { unmarkPostFavourite, markPostFavourite, getPosts })(FavouritePost)

