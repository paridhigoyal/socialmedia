import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgetPassword } from '../actions/index';
// import { Button} from 'react-bootstrap';

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
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleOnChange}
                    />
                    <br/>
                    <button> email </button>
                </form>
            </div>
        )
    }
}

export default connect(null, { forgetPassword })(ForgetPassword)
