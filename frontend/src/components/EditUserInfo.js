import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { editUserInfo, getUserInfo } from '../actions'

export class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pk: this.props.value.pk,
      username: this.props.value.username,
      email: this.props.value.email,
      first_name: this.props.value.first_name,
      last_name: this.props.value.last_name,
      showForm: false
    }
  }

  onInputChange = (event) => {
    switch (event.target.name) {

      case 'first_name':
        this.setState({
          first_name: event.target.value
        })
        break;

      case 'last_name':
        this.setState({
          last_name: event.target.value
        })
        break;

      default:
        break;
    }
  }
  validate = () => {
    let nameError = "";
    if (this.state.first_name.length < 3) {
      nameError = "First Name must be 3 letter long";
    }
    if (!/^[a-z\s]+$/i.test(this.state.first_name)) {
      nameError = "First Name must contain only alphabet";
    }
    if (this.state.last_name.length < 3) {
      nameError = "Last Name must be 3 letter long";
    }
    if (!/^[a-z\s]+$/i.test(this.state.last_name)) {
      nameError = "Last Name must contain only alphabet";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    else {
      return true;
    }

  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    let form_data = new FormData();

    if (isValid) {
      form_data.append('first_name', this.state.first_name);
      form_data.append('last_name', this.state.last_name);
      form_data.append('pk', this.state.pk);
      form_data.append('username', this.state.username);
      this.props.editUserInfo(form_data)
      this.props.getUserInfo()

    }
    else {
      alert('First Name and Last name can only contaion alphabet and must have 3 characters')
    }

  }

  showForm = () => {
    return (<div>
      <form onSubmit={this.handleSubmit} >
        <FormControl>
          <InputLabel>First Name</InputLabel>
          <Input
            type='text'
            name='first_name'
            value={this.state.first_name}
            onChange={this.onInputChange}
            placeholder="first name" /><br />
        </FormControl>
        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <Input
            type='text'
            name='last_name'
            value={this.state.last_name}
            onChange={this.onInputChange}
            placeholder="last name" /><br />
        </FormControl>
        <br />
        <Button type='submit' onClick={this.handleSubmit} variant="contained" color="secondary">
          Update User Info
  </Button>
      </form>
    </div>
    );
  }
  render() {
    return (
      <div>
        <Button type="button" variant="contained" color="primary" startIcon={<EditIcon />}
          onClick={() => this.setState({ showForm: true })}>
          Edit User Info
</Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }
}

export default connect(null, { editUserInfo, getUserInfo })(EditUserInfo)



