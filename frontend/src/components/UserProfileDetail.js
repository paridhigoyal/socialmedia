import React, { Component } from 'react'
import {getUserProfile,getUserPosts} from '../actions'
import {connect} from 'react-redux'
import CakeIcon from '@material-ui/icons/Cake';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';


class UserProfileDetail extends Component {
    constructor(props){
        super(props);
      
    }
    
    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getUserProfile(params.userId)
       
      

    }
   
    render() {
        const { profile } = this.props.userProfileReducer
       
        return (
            <div>
                 <div className='Div'>

<ul >
  <center><h2>User Information..</h2></center>
    <li >
        <Avatar alt="No profileimage" src={profile.profile_picture} /> 
        <b> <h3>{profile.username}</h3></b><br/>
        {profile && profile.first_name && profile.first_name.toUpperCase()} &nbsp;
        {profile && profile.last_name && profile.last_name.toUpperCase()}<br /><br />
        < LocationOnIcon /> {profile.location}<br /><br />
        <b> {profile.bio}</b><br /><br />
        <b> {profile.gender === 'F' && <p>Female</p>}</b>
        <b> {profile.gender === 'M' && <p>Male</p>}</b>
        <CakeIcon />{profile.date_of_birth}<br /><br />
        <ContactPhoneIcon />{profile.contact_no}<br /><br />
        <div>
          following: <a href={`/following/${profile.user_id}`} id="following">
            {profile.following_count}</a>&nbsp;
      followers: <a href={`/followers/${profile.user_id}`} id="followers">
            {profile.followers_count}</a>
        </div>     
    </li>

</ul>
</div>
            </div>
        )
    }
}

const mapStateToProps = ({ userProfileReducer,  userPostReducer }) => {
    return ({
      userProfileReducer,
      userPostReducer

    })
  }
  
export default connect(mapStateToProps, { getUserProfile, getUserPosts })( UserProfileDetail);

