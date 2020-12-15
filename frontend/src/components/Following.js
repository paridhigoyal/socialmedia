/** Following component is to get followings of particular user */

import React, { Component } from 'react'
import { getFollowing } from '../actions'
import { connect } from 'react-redux'

export class Following extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getFollowing(params.id)
  }
  render() {
    const { followings } = this.props.followingreducer
    return (
      <div className="Div">
        <ul>
          <h2> Following List....</h2><hr/>
          {followings.map((value, index) => (
            <li key={index} className="Div>">
               <b> <h4>{value.is_followed_by.username}</h4></b>
            </li>
          ))
          }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ followingreducer }) => {
  return ({
    followingreducer
  }
  )
}

export default connect(mapStateToProps, { getFollowing })(Following);


