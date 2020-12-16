/**UserProfile component is for creating user profile */

import React, { Component } from 'react'
import { Button, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { createProfile, getProfiles, getUserInfo, getUserPosts, getUserFav } from '../actions/index'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Avatar from '@material-ui/core/Avatar';
import EditProfile from './EditProfile';
import CakeIcon from '@material-ui/icons/Cake';
import '../App.css'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditUserInfo from './EditUserInfo';
import EmailIcon from '@material-ui/icons/Email';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import EditComment from './EditComment';
import PostRate from './PostRate';
import EditPost from './EditPost';
import AddComment from './AddComment';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      profile_picture: "",
      gender: "",
      bio: "",
      location: "",
      contact_no: "",
      user_id: "",
    }

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange = (event) => {
    switch (event.target.name) {

      case 'bio':
        this.setState({
          bio: event.target.value
        })
        break;

      case 'location':
        this.setState({
          location: event.target.value
        })
        break;

      case 'date_of_birth':
        this.setState({
          date_of_birth: event.target.value
        })
        break;

      case 'profile_picture':
        this.setState({
          profile_picture: event.target.files[0]
        })
        break;
      case 'gender':
        this.setState({ gender: event.target.value })
        break;

      default:
        break;
    }
  }
  componentDidMount() {
    const { pk } = this.props.authReducer.user
    this.props.getUserInfo();
    this.props.getProfiles();
    this.props.getUserPosts(pk);
    this.props.getUserFav(pk);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('user_id', this.props.authReducer.user.user_id);
    form_data.append('username', this.props.authReducer.user.username);
    form_data.append('first_name', this.props.authReducer.user.first_name);
    form_data.append('last_name', this.props.authReducer.user.last_name);
    form_data.append('profile_picture', this.state.profile_picture, this.state.profile_picture.name);
    form_data.append('bio', this.state.bio);
    form_data.append('contact_no', this.state.contact_no);
    form_data.append('gender', this.state.gender)
    form_data.append('location', this.state.location);
    form_data.append('date_of_birth', this.state.date_of_birth);
    this.props.createProfile(form_data)
  }
  validate() {
  }
  showForm = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <FormControl>
            <InputLabel>Profile Image</InputLabel>
            <Input
              type='file'
              accept="image/png, image/jpeg"
              name='profile_picture'
              onChange={this.onInputChange} /><br />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel>Bio</InputLabel>
            <Input
              type='text'
              name='bio'
              value={this.state.bio}
              onChange={this.onInputChange}
              placeholder="bio" /><br />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel>Location</InputLabel>
            <Input
              type='text'
              name='location'
              value={this.state.location}
              onChange={this.onInputChange}
              placeholder="location" /><br />
          </FormControl>
          <br />
          <FormControl>

            <PhoneInput
              type='text'
              value={this.state.contact_no}
              onChange={contact_no => this.setState({ contact_no })}
              placeholder="contact no" /><br />
          </FormControl>
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onInputChange}>
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl>
            <Input
              type='date'
              name='date_of_birth'
              value={this.state.date_of_birth}
              onChange={this.onInputChange}
              placeholder="date_of_birth" /><br />
          </FormControl>
          <br />
          <Button type='submit' onClick={this.handleSubmit} variant="contained" color="primary">
            Add Profile Details..
    </Button>
        </form>
      </div>
    );
  }

  render() {
    const { posts } = this.props.userPostReducer
    const { favposts } = this.props.userFavPostReducer
    const { profiles } = this.props.profilereducer
    const { user } = this.props.userInfoReducer
    const { pk, username, first_name, email, last_name } = this.props.authReducer.user
    const data = { pk, username, first_name, email, last_name }
    return (
      <div>
         <ul className="block">
          {favposts.length===0 && <h2>No Fav Posts..</h2> }
          {favposts.length!==0 && <div>
            <h2>Fav Posts... </h2>
          {favposts.map((value, index)=>(
            <li key={index}>
               click to view post... <a href={`/post/${value.favourite_post}`} >
               {value.favourite_post}</a>&nbsp;
       
            </li>
          ))}
          
          </div>}
        </ul>
        <div className='Div'>
       
          <ul >
            <center><h2>User Information..</h2></center><hr/><br />
            <b> <h3>{user.username}</h3></b><br />
            <EmailIcon />{user.email}<br /><br />
            {user && user.first_name && user.first_name.toUpperCase()} &nbsp;
                  {user && user.last_name && user.last_name.toUpperCase()}<br /><br />
            <EditUserInfo value={data} />
            {profiles && profiles.map((value, index) => (
              <li key={index} >

                {pk === value.user_id ? <div>
                  <Avatar alt="No profileimage" src={value.profile_picture} />
                  < LocationOnIcon /> {value.location}<br /><br />
                  <b> {value.bio}</b><br /><br />
                  <b> {value.gender === 'F' && <p>Female</p>}</b>
                  <b> {value.gender === 'M' && <p>Male</p>}</b>
                  <CakeIcon />{value.date_of_birth}<br /><br />
                  <ContactPhoneIcon />{value.contact_no}<br /><br />
                  <div>
                    following: <a href={`/following/${value.user_id}`} id="following">
                      {value.following_count}</a>&nbsp;
                followers: <a href={`/followers/${value.user_id}`} id="followers">
                      {value.followers_count}</a>
                  </div>
                  <br />
                  <div>
                    {(value.profile_belongs_to_authenticated_user) ?
                      <EditProfile value={value} /> :
                      <Button
                        type="submit" color="primary" variant="contained"
                        onClick={() => this.setState({ showForm: true })}
                      >
                        Add Profile details..
        </Button>
                    }
                  </div>

                </div> : <p></p>}
              </li>
            ))
            }
          </ul>
        </div>
       
        <ul >
          {posts.length === 0 && <h2>No posts available..</h2>}
          {posts !== undefined && posts.map((value, index) => (

            <li key={index} className='Div'>
              {value.post_belongs_to_authenticated_user && <div>
                <h5> <b>{value.post_by.username} </b></h5>

                <div>
                  <img style={{ resizeMode: 'cover', width: 300, height: 200 }}
                    src={value.image} alt="abc"></img><br />
                  <b>{value.post_by !== undefined && value.post_by.username} </b>
                  {value.caption}<br />
                  <h6 style={{ color: 'gray' }}> <DateRangeOutlinedIcon /> {value.posted_at} </h6>
                </div>
                <div>
                  {value.post_belongs_to_authenticated_user &&
                    <Button type="button" variant="contained"
                      startIcon={<DeleteForeverRoundedIcon />}
                      onClick={() => { this.deletePost(value.id) }}>
                      DeletePost</Button>}
                </div><br />
                <div>
                  {value.post_belongs_to_authenticated_user && <EditPost value={value} />}
                </div>
                <div>
                  <ThumbUpIcon /> {value.likes_count} &nbsp;&nbsp;
                     <ThumbDownIcon /> {value.dislikes_count}  &nbsp;<br />
                </div>
                <PostRate value={value} pk={user.pk} /><br />

                <div>
                  <CommentIcon /> {value.comments_count} comments<br />

                  <AddComment id={value.id} />
                </div>
                <br />

                <div> {value.comments_count !== 0 && <b><h5><CommentIcon /> comments.....</h5></b>}</div>
                <div>
                  <ul>

                    {value.comments.map((data, index) =>
                      (

                        <li key={index}>
                          <b>{data.comment_by.username}</b>&nbsp;
                            {data.content}
                          {user.pk === data.user && <DeleteForeverRoundedIcon
                            onClick={() => { this.deleteComment(data.id) }}
                            variant="contained" />}
                          {user.pk === data.user && <EditComment data={data} />}
                          <h6 style={{ color: 'gray' }}>{data.commented_at}</h6>

                        </li>
                      ))
                    }

                  </ul>
                </div>
              </div>}
            </li>

          ))
          }
          <br />
        </ul>
       

        <Button
          type="button" color="primary" variant="contained"
          onClick={() => this.setState({ showForm: true })}
        >
          Add Profile details..
        </Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

const mapStateToProps = (
  { authReducer, profilereducer, userInfoReducer,userPostReducer, userFavPostReducer }
  ) => {
  return {
    authReducer,
    profilereducer,
    userInfoReducer,
    userPostReducer,
    userFavPostReducer

  }
}

export default connect(mapStateToProps, {
  createProfile, getProfiles, getUserInfo,
  getUserPosts, getUserFav
})(UserProfile)
