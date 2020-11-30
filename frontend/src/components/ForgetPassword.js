/** ForgetPassword component consists of forget passdword functionality which takes email 
 * as an input field helps to send an email to reset password  */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgetPassword } from '../actions/index';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';

export class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: ""
    }
  }

  handleOnChange = event => this.setState({ email: event.target.value })
  handleOnSubmit = event => {
    event.preventDefault()
    const isValid = this.validate();
    var bodyFormData = new FormData();
    this.setState({
      email: '',

    })
    if (isValid) {
      bodyFormData.append('email', this.state.email);
      this.props.forgetPassword(bodyFormData)

    }
    else {
      alert('enter valid email id')
    }
  }

  validate = () => {
    let emailError = '';
    if (!this.state.email) {
      emailError = "Required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      emailError = "Invalid email address";
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    }
    return true;

  };
  render() {
    return (
      <div className='Div'>
        <h4>If forget than enter your registered mail here..</h4>
        <form onSubmit={this.handleOnSubmit}>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleOnChange} />
          </FormControl>

          <Button disabled={!this.state.email} type='submit' onClick={this.handleOnSubmit}
            variant="contained" color="secondary">
            Send email
    </Button>

        </form>
      </div>
    )
  }
}

export default connect(null, { forgetPassword })(ForgetPassword)
