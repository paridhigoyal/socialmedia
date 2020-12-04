import React, { Component } from 'react'
import {getUserProfile} from '../actions'
import {connect} from 'react-redux'

class UserProfileDetail extends Component {
    
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.userId)
        this.props.getUserProfile(params.userId)
    }
    render() {
        const { profiles } = this.props.profilereducer
        console.log(profiles)
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = ({ authReducer, profilereducer }) => {
    return {
      authReducer,
      profilereducer
    }
  }
  
export default connect(mapStateToProps, { getUserProfile })( UserProfileDetail);

