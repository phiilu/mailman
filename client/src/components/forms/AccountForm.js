import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import yup from "yup";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import {
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { toast } from "react-toastify";

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

class AccountForm extends Component {
  state = {
    username: "",
    domain: "",
    password: "",
    quota: "0",
    enabled: true,
    sendonly: false
  };

  async componentDidMount() {
    if (this.props.domains.length === 0) await this.props.getAll();
    if (this.props.domains.length > 0) {
      this.setState({
        domain: this.props.domains[0].domain
      });
    }

    const { id } = this.props.match.params;
    const account = this.props.accounts.find(account => account.id === +id);

    if (account) {
      this.setState({
        username: account.username,
        domain: account.domain,
        password: "",
        quota: account.quota,
        enabled: account.enabled === "1",
        sendonly: account.sendonly === "1"
      });
    }

    this.schema = yup.object().shape({
      username: yup.string().required("The username is required"),
      domain: yup.string().required("The domain is required"),
      password: this.props.update
        ? yup.string().min(8, "Passwords should be at least 8 characters long.")
        : yup
            .string()
            .min(8, "Passwords should be at least 8 characters long.")
            .required("Password is required"),
      quota: yup
        .number()
        .positive("Quota must be a positive number")
        .required("Quota is required"),
      enabled: yup.boolean().required("Enabled is required"),
      sendonly: yup.boolean().required("Enabled is required")
    });
  }

  render() {
    const { update, classes } = this.props;
    return (
      <Formik
        initialValues={{
          username: this.state.username,
          domain: this.state.domain,
          password: this.state.password,
          quota: this.state.quota,
          enabled: this.state.enabled,
          sendonly: this.state.sendonly
        }}
        enableReinitialize={true}
        validationSchema={this.schema}
        validateOnChange={true}
        onSubmit={(
          values,
          { setSubmitting, setValues, setFieldValue, resetForm }
        ) => {
          this.props
            .submit(values)
            .then(data => {
              if (this.props.update) {
                toast.success("Updated successfully!");
                setFieldValue("password", "");
                setSubmitting(false);
              } else {
                toast.success("Saved successfully!");
                resetForm();
              }
            })
            .catch(error => {
              const { status, message } = handleRequestError(error);
              if (status !== 401) {
                setSubmitting(false);
                toast.error("Error: " + message);
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
          isValid,
          setFieldValue,
          setFieldTouched
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  id="username"
                  label="Username"
                  name="username"
                  placeholder="user"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.textfield}>
                  <InputLabel htmlFor="domains">Domain</InputLabel>
                  <Select
                    error={touched.domain && !!errors.domain}
                    name="domain"
                    value={values.domain}
                    onChange={e => setFieldValue("domain", e.target.value)}
                    onBlur={() => setFieldTouched("domain", true)}
                    input={<Input id="domains" />}
                  >
                    {this.props.domains.map(domain => (
                      <MenuItem key={domain.id} value={domain.domain}>
                        {domain.domain}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.domain && errors.domain}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={touched.quota && !!errors.quota}
                  helperText={touched.quota && errors.quota}
                  id="quota"
                  label="Quota"
                  name="quota"
                  type="number"
                  placeholder="1024"
                  value={values.quota}
                  onChange={handleChange}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.enabled}
                      onChange={(event, checked) =>
                        setFieldValue("enabled", checked)
                      }
                    />
                  }
                  label="Enabled"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.sendonly}
                      onChange={(event, checked) =>
                        setFieldValue("sendonly", checked)
                      }
                    />
                  }
                  label="Sendonly"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  raised
                  color="accent"
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.button}
                >
                  {update ? "Update Account" : "Save Account"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  }
}

AccountForm.propTypes = {
  domain: PropTypes.string,
  update: PropTypes.bool
};

AccountForm.defaultProps = {
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

export default enhance(AccountForm);
