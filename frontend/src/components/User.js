import React from "react";
import "../styles/Profile.css";
import Grid from "@material-ui/core/Grid/Grid";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { reduxForm, Field } from "redux-form";
import Button from "@material-ui/core/Button/Button";
import { connect } from "react-redux";
import { FormControl, Typography } from "@material-ui/core";
import validate from "./validate";
const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <>
      <TextField {...input} type={type} label={label} variant="outlined" />
      <br />
      {touched && error && <span className="profile-formError">{error}</span>}
    </>
  );
};

const renderDisabledField = ({
  input,
  label,
  type,
}) => (
    <TextField disabled {...input} type={type} label={label} variant="outlined" />
  );

class User extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {
      user: { loading, error, data },
      updateUser,
    } = this.props;

    const { handleSubmit } = this.props;

    return (
      <div className="profile">
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h5" component="header">
            Profile
          </Typography>
          <Grid item sm className="profile-upper-section"></Grid>
          <Grid item sm className="profile-lower-section">
            {loading ? (
              <Spinner />
            ) : error ? (
              <div>User data loading failed</div>
            ) : (
                  data && null
                )}
            <form
              onSubmit={handleSubmit((values) => updateUser({ ...values }))}
              className="profile-form"
            >
              <FormControl fullWidth>
                <div className="profile-formField">
                  <Field
                    id="first_name"
                    name="first_name"
                    type="text"
                    component={renderField}
                    label="First Name"
                  />
                </div>
                <div className="profile-formField">
                  <Field
                    id="last_name"
                    name="last_name"
                    type="text"
                    component={renderField}
                    label="Last Name"
                  />
                </div>
                <div className="profile-formField">
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    component={renderDisabledField}
                    label="Username*"
                    className="profile-formField"
                  />
                </div>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

User = reduxForm({
  form: "user-form",
  validate,
})(User);

User = connect((state) => ({
  initialValues: state.user.data,
}))(User);

export default User;