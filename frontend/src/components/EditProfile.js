/** EditProfile component is for editing userprofile 
 * consist of profile fields */

import React, { Component } from 'react'
import { editProfile } from '../actions/index';
import { connect } from 'react-redux';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import PhoneInput from 'react-phone-number-input'

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.value.id,
      user_id: this.props.value.user_id,
      username: this.props.value.username,
      followers_count: this.props.value.followers_count,
      following_count: this.props.value.following_count,
      profile_belongs_to_authenticated_user: this.props.value.profile_belongs_to_authenticated_user,
      first_name: this.props.value.first_name,
      last_name: this.props.value.last_name,
      bio: this.props.value.bio,
      location: this.props.value.location,
      gender: this.props.value.gender,
      date_of_birth: this.props.value.date_of_birth,
      contact_no: this.props.value.contact_no,
      profile_picture: this.props.value.profile_picture,
      follow_status: this.props.value.follow_status

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

      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append('profile_picture', this.state.profile_picture, this.state.profile_picture.name);
    form_data.append('bio', this.state.bio);
    form_data.append('contact_no', this.state.contact_no);
    form_data.append('gender', this.state.gender)
    form_data.append('location', this.state.location);
    form_data.append('date_of_birth', this.state.date_of_birth);
    this.props.editProfile(this.props.value.id, form_data)
  }

  showForm = () => {
    return (<div>
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
          <InputLabel>Contact No</InputLabel>
          <PhoneInput
            type='text'
            country={"in"}
            value={this.state.contact_no}
            onChange={contact_no => this.setState({ contact_no })}
            placeholder="contact no" /><br />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Date Of Birth</InputLabel>
          <Input
            type='date'
            name='date_of_birth'
            value={this.state.date_of_birth}
            onChange={this.onInputChange}
            placeholder="date_of_birth" /><br />
        </FormControl>
        <br />
        <Button type='submit' onClick={this.handleSubmit} variant="contained" color="secondary">
          Update Profile
    </Button>

      </form>
    </div>
    );
  }


  render() {
    return (
      <div>
        <Button type="button" variant="contained" color="secondary" 
        onClick={() => this.setState({ showForm: true })}>Edit Profile</Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editProfile })(EditProfile) 