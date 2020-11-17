import React, { Component } from 'react'
import { Button, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { createProfile } from '../actions/index'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


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
            <InputLabel>Contact No</InputLabel>
            <PhoneInput
              type='text'
              country={"in"}
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
            Add Profile
    </Button>
        </form>
      </div>
    );
  }

  render() {

    return (
      <div>
        <button
          type="button"
          onClick={() => this.setState({ showForm: true })}
        >
          Create Profile
        </button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    authReducer

  }
}

export default connect(mapStateToProps, { createProfile })(UserProfile)
