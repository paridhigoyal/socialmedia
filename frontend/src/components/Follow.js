import React, { Component } from 'react'
import { follow } from '../actions/index'
import { connect } from 'react-redux'

export class Follow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {console.log("", this.props)}
        <button
          onClick={() => this.props.follow(this.props.id)}>
          Follow
        </button>

      </div>
    )
  }
}



export default connect(null, { follow })(Follow);
