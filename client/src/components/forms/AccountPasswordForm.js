import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import yup from "yup";
import { toast } from "react-toastify";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";

import { getAll } from "../../actions/data";
import { handleRequestError } from "../../util";

const styles = {
  textfield: {
    width: "100%"
  },
  button: {
    marginBottom: "1em"
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
              toast.success("Password changed successfully!");
            })
            .catch(error => {
              setSubmitting(false);
              const { message } = handleRequestError(error);
              toast.error("Error: " + message);
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
                  label="New Password confirmation"
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
                  className={classes.button}
                >
                  Change Password
                </Button>
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
