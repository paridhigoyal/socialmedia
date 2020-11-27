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
    var bodyFormData = new FormData();
    bodyFormData.append('email', this.state.email);
    this.props.forgetPassword(bodyFormData)
  }

  render() {
    return (
      <div>
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
