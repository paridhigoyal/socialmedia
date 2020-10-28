import React, { Component, } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import { Field, reduxForm } from "redux-form"
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { validate, asyncValidate } from "./validate"

const renderField = ({
  input,
  label,
  type,
  meta: { error, warning, touched, asyncValidating },
}) => (
    <div className={asyncValidating ? "async-validating" : ""}>
      <TextField
        {...input}
        type={type}
        label={label}
        placeholder={label}
        error={touched && error}
        fullWidth
      />
      <center>
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </center>
      <br />
    </div>
  );
export class Signup extends Component {
  submit = (values) => {
    // console.log('aa')
    alert("Form submitted successfully.....");
    // console.log(values);
  };
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      history,
      submitFailed,
      submitSucceeded,
    } = this.props;
    if (submitSucceeded) {
      // console.log('asa')
      history.push("/login");
    }
    return (
      <div>
        <Grid container direction="row" alignItems="baseline" className="form">
          <Grid item sm></Grid>
          <Grid item sm >
            <Typography component="h1" variant="h3" className="form-heading">
              Signup
                </Typography>
            <form onSubmit={handleSubmit((data) => this.submit({ ...data }))}>
              <Field
                name="username"
                label="username"
                type="text"
                component={renderField}
                className="form-field"
              />
              <Field
                name="email"
                label="Email*"
                type="text"
                component={renderField}
                className="form-field"
              />
              <Field
                name="password"
                label="Password1*"
                type="password"
                component={renderField}
                className="form-field"
              />
              <Field
                name="re_password"
                label="Password2*"
                type="password"
                component={renderField}
                className="form-field"
              />
              <br />
              {submitFailed ? <small>Something went wrong</small> : null}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={pristine || submitting || invalid}
              >
                Signup <ArrowForwardOutlinedIcon />
                {submitting ? <CircularProgress color="secondary" /> : ""}
              </Button>
              <br />
              <Link to="/login">
                <small>Already a user? login here</small>
              </Link>
            </form>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </div>
    );
  }
}

Signup = reduxForm({
  form: "signup-form",
  // destroyOnUnmount: false,
  // forceUnregisterOnUnmount: true,
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'email']
})(Signup);

export default Signup;