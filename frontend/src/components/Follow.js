import React, { Component } from 'react'
import { follow } from '../actions/index'
import { connect } from 'react-redux'

export class Follow extends Component {

  render() {
    return (
      <div>
        {this.props.followStatus === 'Follow' && <button
          onClick={() => this.props.follow(this.props.id)}>
          Follow
        </button>
        }
        {this.props.followStatus === "Following" && <button
          onClick={() => this.props.follow(this.props.id)}>
          UnFollow
        </button>
        }
      </div>
    )
  }
}

export default connect(null, { follow })(Follow);
