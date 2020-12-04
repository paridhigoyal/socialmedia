/** Followers component is to get followers of particular user */

import React, { Component } from 'react';
import { getFollowers } from '../actions/index';
import { connect } from 'react-redux'

export class Followers extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getFollowers(params.id)
  }
  render() {
    const { followers } = this.props.followerreducer
    return (
        <div>
          <ul>
          {followers.map((value,index)=>(
            <li key={index} className="Div>">
           <b> <h4>{value.user.username}</h4></b>
            </li>
          ))
      }
          </ul>
        </div>
    )
  }
}

const mapStateToProps = ({ authReducer, followerreducer }) => {
  return ({authReducer,
    followerreducer
  })
}

export default connect(mapStateToProps, { getFollowers })(Followers);
