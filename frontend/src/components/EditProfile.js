import React, { Component } from 'react'

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {
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
        }

        this.onInputChange = this.onInputChange.bind(this);

    }
    onInputChange = (event) => {
        switch (event.target.name) {
            case 'bio':
                this.setState({
                    profileData: {
                        ...this.state.profileData,
                        bio: event.target.value
                    }
                })
                break;
            case 'location':
                this.setState({
                    profileData: {
                        ...this.state.profileData,
                        location: event.target.value
                    }
                })

                break;
            case 'date_of_birth':
                this.setState({
                    profileData: {
                        ...this.state.profileData,
                        date_of_birth: event.target.value
                    }
                })
                break;
            case 'gender':
                this.setState({
                    profileData: {
                        ...this.state.profileData,
                        gender: event.target.value
                    }
                })
                break;
            default:
                break;
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.props.value)
        this.props.editPost(this.props.value.id, this.state.profileData)
    }
    showForm = () => {

        return (<div>
            <form onSubmit={this.handleSubmit} >
                <label>Profile Image:</label>
                <input type='file'
                    name='profile_picture'
                // value={this.state.profileData.profile_picture}
                // onChange={this.onInputChange}
                /><br />
                <label>Bio</label>
                <input type='text'
                    name='bio'
                    value={this.state.profileData.bio}
                    onChange={this.onInputChange}
                    placeholder="bio" /><br />
                <label>Location</label>
                <input type='text'
                    name='location'
                    value={this.state.profileData.location}
                    onChange={this.onInputChange}
                    placeholder="location" /><br />
                <div name='gender' value={this.state.profileData.gender} onChange={this.onInputChange}>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label for="male">Male</label><br />
                    <input type="radio" id="female" name="gender" value="female" />
                    <label for="female">Female</label><br />
                </div>
                <label>Contact No</label>
                <input type='text'
                    name='contact_no'
                    value={this.state.profileData.contact_no}
                    onChange={this.onInputChange}
                    placeholder="contact no" /><br />
                <label>Date Of Birth</label>
                <input type='date'
                    name='date_of_birth'
                    value={this.state.profileData.date_of_birth}
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

export default EditProfile
