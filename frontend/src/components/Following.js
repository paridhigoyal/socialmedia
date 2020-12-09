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
      <div>
        <ul>
          {followings.map((value, index) => (
            <li key={index} className="Div>">
              {value.is_followed_by.username}
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


