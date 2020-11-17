import React, { Component } from 'react'
import { getProfiles } from '../actions/index'
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import Follow from './Follow'
import Avatar from '@material-ui/core/Avatar';
class Profiles extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.authReducer
    if (isAuthenticated) {
      this.props.getProfiles()
    }
  }
  render() {
    const { profiles } = this.props.profilereducer
    return (
      <div>
        <ul>
          {profiles.map((value, index) => (

            <li key={index}>
              <Avatar alt="No profileimage" src={value.profile_picture} />
              <b> {value.username}</b><br />
              {value.first_name} {value.last_name}<br />
              {value.location}<br />

              <div>
                following: <a href={`/following/${value.user_id}`} id="following">
                  {value.following_count}</a>&nbsp;
                followers: <a href={`/followers/${value.user_id}`} id="followers">
                  {value.followers_count}</a>
              </div>
              <div>
                {(value.profile_belongs_to_authenticated_user) ?
                  <EditProfile value={value} /> :
                  <p>...</p>
                }
              </div>
              <div >
                {
                  (!value.profile_belongs_to_authenticated_user)
                    ? <Follow followStatus={value.follow_status} id={value.user_id} />
                    : <b> Can't follow yourself </b>
                }
              </div>

            </li>
          ))
          }
        </ul>
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

export default connect(mapStateToProps, { getProfiles })(Profiles);
