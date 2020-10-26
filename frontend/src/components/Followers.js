import React, { Component } from 'react';
import { getFollowers } from '../actions/index';
import { connect } from 'react-redux'

export class Followers extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // const { match: { params } } = this.props;
    // const id = parseInt(this.props.match.params.id);
    console.log(this.props)

    this.props.getFollowers()

  }
  render() {
    return (
      <div>
        {console.log("ghgj", this.props)}

      </div>
    )
  }
}

const mapStateToProps = ({ authReducer, followerreducer }) => {
  return (authReducer,
    followerreducer
  )
}

export default connect(mapStateToProps, { getFollowers })(Followers);
