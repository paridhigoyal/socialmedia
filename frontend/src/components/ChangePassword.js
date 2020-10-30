import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePassword } from '../actions/index'
import 'bootstrap/dist/css/bootstrap.min.css';

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
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
            bodyFormData.append('input', this.state.input);
            this.props.changePassword(bodyFormData)
            let input = {};
            input["newpassword1"] = "";
            input["newpassword2"] = "";

            this.setState({ input: input });
            console.log(this.state.input)
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

        if (!input["newpassword1"]) {
            isValid = false;
            errors["newpassword1"] = "Please enter your password.";
        }
        else if (!strongRegex.test(input["newpassword1"])) {
            isValid = false;
            errors["newpassword1"] = "Password should be alphanumeric";
          }

        if (!input["newpassword2"]) {
            isValid = false;
            errors["newpassword2"] = "Please enter your confirm password.";
        }
        else if (!strongRegex.test(input["newpassword2"])) {
            isValid = false;
            errors["newpassword2"] = "Password should be alphanumeric";
          }

        if (typeof input["newpassword1"] !== "undefined" && typeof input["newpassword2"] !== "undefined") {

            if (input["newpassword1"] !== input["newpassword2"]) {
                isValid = false;
                errors["newpassword1"] = "Passwords don't match.";
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
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newpassword1"
                        value={this.state.input.newpassword1}
                        onChange={this.handleOnChange}
                        placeholder="newpassword"
                    />
                    <div className="text-danger">{this.state.errors.newpassword1}</div>

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="newpassword2"
                        value={this.state.input.newpassword2}
                        onChange={this.handleOnChange}
                        placeholder="re-enter new password"
                    />
                    <div className="text-danger">{this.state.errors.newpassword2}</div>
                    <button> change password</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { changePassword })(ChangePassword)
