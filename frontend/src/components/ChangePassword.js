import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePassword } from '../actions/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { browserHistory } from 'react-router'
import {
  Button,
  FormControl,
  InputLabel,
  Input
} from '@material-ui/core';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {new_password1:"",
      new_password2:""},
      errors: {}
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input
    });
  }

  handleOnSubmit = (event) => {

    event.preventDefault();
    if (this.validate()) {
      console.log(this.state.input);
      var bodyFormData = new FormData();
      bodyFormData.append('new_password1', this.state.input.new_password1);
      bodyFormData.append('new_password2', this.state.input.new_password2);
      this.props.changePassword(bodyFormData)
      browserHistory.push('/login')
      let input = {};
      input["new_password1"] = "";
      input["new_password2"] = "";
      this.setState({ input: input });
      alert('Demo Form is submited');
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!input["new_password1"]) {
      isValid = false;
      errors["new_password1"] = "Please enter your password.";
    }
    else if (!strongRegex.test(input["new_password1"])) {
      isValid = false;
      errors["new_password1"] = "Password should be alphanumeric";
    }

    if (!input["new_password2"]) {
      isValid = false;
      errors["new_password2"] = "Please enter your confirm password.";
    }
    else if (!strongRegex.test(input["new_password2"])) {
      isValid = false;
      errors["new_password2"] = "Password should be alphanumeric";
    }

    if (typeof input["new_password1"] !== "undefined" && typeof input["new_password2"] !== "undefined") {

      if (input["new_password1"] !== input["new_password2"]) {
        isValid = false;
        errors["new_password1"] = "Passwords don't match.";
      }
    }
    this.setState({
      errors: errors
    });
    return isValid;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <FormControl>
            <InputLabel>New Password</InputLabel>
            <Input
              type="password"
              name="new_password1"
              value={this.state.input.new_password1}
              onChange={this.handleOnChange}
              placeholder="new_password"
            />
          </FormControl>
          <div className="text-danger">{this.state.errors.new_password1}</div>
          <FormControl>
            <InputLabel>Confirm Password</InputLabel>
            <Input
              type="password"
              name="new_password2"
              value={this.state.input.new_password2}
              onChange={this.handleOnChange}
              placeholder="re-enter new password"
            />
          </FormControl>
          <div className="text-danger">{this.state.errors.new_password2}</div>
          <br />
          <Button type='submit' onClick={this.handleOnSubmit.bind(this)}
            disabled={!this.state.input.new_password1, !this.state.input.new_password2}
            variant="contained" color="secondary"> change password</Button>
        </form>
      </div>
    )
  }
}

export default connect(null, { changePassword })(ChangePassword)
