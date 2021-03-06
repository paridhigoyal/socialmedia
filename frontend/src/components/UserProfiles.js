/**UserProfiles component is for user profiles having user details and 
 * follow button and number of followers and followings of particular user  */

import React, { Component } from 'react'
import { getProfiles, getUserProfile } from '../actions/index'
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import Follow from './Follow'
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

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
      <div className='Div'>
        <ul>
          {profiles.map((value, index) => (
            <li key={index}>
              <Avatar alt="No profileimage" src={value.profile_picture} />
              <b> <h4>{value.username}</h4></b>
              {value.first_name} {value.last_name}<br />
              {value.location}<br />
              <div>
                following: <Link to={`following/${value.user_id}`}>{value.following_count}</Link>&nbsp;

                followers:  <Link to={`followers/${value.user_id}`}>{value.followers_count}</Link>&nbsp;

              </div>
              <div>
                {(value.profile_belongs_to_authenticated_user) ?
                  <EditProfile value={value} /> :
                  <p></p>
                }
              </div>
             
              <div >
                {
                  (!value.profile_belongs_to_authenticated_user)
                    ? <Follow followStatus={value.follow_status} id={value.user_id} />
                    : <b>  </b>
                }
              </div>
              <br/>
              <div>
                <Link to={`userInfo/${value.id}`}><button>USER DETAIL</button></Link>
              </div>
              <hr/>
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

export default connect(mapStateToProps, { getProfiles, getUserProfile })(Profiles);