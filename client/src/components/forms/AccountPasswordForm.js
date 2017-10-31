import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import yup from "yup";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";

import { getAll } from "../../actions/data";

const styles = {
  textfield: {
    width: "100%"
  }
};

yup.addMethod(yup.mixed, "sameAs", function(ref, message) {
  return this.test("sameAs", message, function(value) {
    let other = this.resolve(ref);

    return !other || !value || value === other;
  });
});

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Your new password must be at least 8 characters")
    .required("New password is required"),
  newPasswordConfirmation: yup
    .string()
    .sameAs(yup.ref("newPassword"), "Passwords do not match")
    .required("Password confirmation is required")
});

class AccountPasswordForm extends Component {
  state = {
    error: ""
  };

  render() {
    const { classes } = this.props;

    return (
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          newPasswordConfirmation: ""
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, setValues, resetForm }) => {
          this.props
            .submit(values)
            .then(data => {
              resetForm();
              this.setState({
                error: ""
              });
            })
            .catch(error => {
              setSubmitting(false);
              if (error.response) {
                this.setState({
                  error: error.response.data.message
                });
              } else if (error.message) {
                this.setState({
                  error: error.message
                });
              }
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          isValid
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  error={touched.currentPassword && !!errors.currentPassword}
                  helperText={touched.currentPassword && errors.currentPassword}
                  id="currentPassword"
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  placeholder="********"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="********"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    touched.newPasswordConfirmation &&
                    !!errors.newPasswordConfirmation
                  }
                  helperText={
                    touched.newPasswordConfirmation &&
                    errors.newPasswordConfirmation
                  }
                  id="newPasswordConfirmation"
                  label="New Password"
                  name="newPasswordConfirmation"
                  type="password"
                  placeholder="********"
                  value={values.newPasswordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  raised
                  color="accent"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Change Password
                </Button>
              </Grid>
              <Grid item xs={12}>
                {this.state.error}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  }
}

AccountPasswordForm.propTypes = {
  domain: PropTypes.string,
  update: PropTypes.bool
};

AccountPasswordForm.defaultProps = {
  domain: "",
  update: false
};

const mapStateToProps = state => ({
  domains: state.data.domains,
  accounts: state.data.accounts
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { getAll })
);

export default enhance(AccountPasswordForm);
