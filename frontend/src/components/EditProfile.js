import React, { Component } from 'react'
import { editProfile } from '../actions/index';
import { connect } from 'react-redux';
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
      case 'gender':
        this.setState({

          gender: event.target.value

        })
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
    // console.log(this.props.value)
    // console.log(this.state.image.name, this.state.caption, this.state.image)
    let form_data = new FormData();
    form_data.append('profile_picture', this.state.profile_picture, this.state.profile_picture.name);
    form_data.append('bio', this.state.bio);
    form_data.append('location', this.state.location);
    form_data.append('date_of_birth', this.state.date_of_birth);
    // await this.props.editPost(this.props.value.id, form_data)
    this.props.editProfile(this.props.value.id, form_data)
  }
  showForm = () => {

    return (<div>
      <form onSubmit={this.handleSubmit} >
        <label>Profile Image:</label>
        <input type='file'
          accept="image/png, image/jpeg"
          name='profile_picture'
          onChange={this.onInputChange}

        /><br />

        <label>Bio</label>
        <input type='text'
          name='bio'
          value={this.state.bio}
          onChange={this.onInputChange}
          placeholder="bio" /><br />
        <label>Location</label>
        <input type='text'
          name='location'
          value={this.state.location}
          onChange={this.onInputChange}
          placeholder="location" /><br />
        <div name='gender' value={this.state.gender} onChange={this.onInputChange}>
          <input type="radio" id="male" name="gender" value="male" />
          <label for="male">Male</label><br />
          <input type="radio" id="female" name="gender" value="female" />
          <label for="female">Female</label><br />
        </div>
        <label>Contact No</label>
        <input type='text'
          name='contact_no'
          value={this.state.contact_no}
          onChange={this.onInputChange}
          placeholder="contact no" /><br />
        <label>Date Of Birth</label>
        <input type='date'
          name='date_of_birth'
          value={this.state.date_of_birth}
          onChange={this.onInputChange}
          placeholder="date_of_birth" /><br />
        <button>Update Profile</button>
      </form>
    </div>
    );
  }


  render() {
    return (
      <div>
        <button type="button" onClick={() => this.setState({ showForm: true })}>Edit Profile</button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editProfile })(EditProfile) 
