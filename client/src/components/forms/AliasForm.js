import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import queryString from "query-string";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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

const schema = yup.object().shape({
  source_username: yup.string().required("The username is required"),
  source_domain: yup.string().required("The domain is required"),
  destination: yup
    .string()
    .email()
    .required("The destination email is required"),
  enabled: yup.boolean().required("Enabled is required")
});

class AccountForm extends Component {
  state = {
    source_username: "",
    source_domain: "",
    destination: "",
    enabled: true
  };

  async componentDidMount() {
    if (this.props.domains.length === 0) await this.props.getAll();
    if (this.props.domains.length > 0) {
      this.setState({
        source_domain: this.props.domains[0].domain,
        source_username: !this.props.isAdmin ? this.props.username : ""
      });
    }

    const { id } = this.props.match.params;
    const alias = this.props.aliases.find(alias => alias.id === +id);

    if (alias) {
      this.setState({
        source_username: alias.source_username,
        source_domain: alias.source_domain,
        destination: `${alias.destination_username}@${
          alias.destination_domain
        }`,
        enabled: alias.enabled === "1"
      });
    }

    const { domain: source_domain } = queryString.parse(
      this.props.location.search
    );

    if (source_domain) {
      this.setState({ source_domain });
    }
  }

  render() {
    const { update, classes, isAdmin, aliases } = this.props;
    const exists = !!aliases.find(
      alias => alias.id === +this.props.match.params.id
    );

    if (update && !isAdmin && !exists) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    return (
      <Formik
        initialValues={{
          source_username: this.state.source_username,
          source_domain: this.state.source_domain,
          destination: this.state.destination,
          enabled: this.state.enabled
        }}
        enableReinitialize={true}
        validationSchema={schema}
        validateOnChange={true}
        onSubmit={(
          values,
          { setSubmitting, setValues, setFieldValue, resetForm }
        ) => {
          const {
            source_username,
            source_domain,
            enabled,
            destination
          } = values;
          const [destination_username, destination_domain] = destination.split(
            "@"
          );

          this.props
            .submit({
              source_username,
              source_domain,
              destination_username,
              destination_domain,
              enabled
            })
            .then(data => {
              if (this.props.update) {
                toast.success(`Updated alias sucessfully!`);
                setSubmitting(false);
              } else {
                toast.success("Alias created sucessfully!");
                resetForm();
              }
            })
            .catch(error => {
              const { message, status } = handleRequestError(error);
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
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextField
                  error={touched.source_username && !!errors.source_username}
                  helperText={touched.source_username && errors.source_username}
                  id="username"
                  label="Username"
                  name="source_username"
                  placeholder="user"
                  value={values.source_username}
                  onChange={handleChange}
                  margin="normal"
                  className={classes.textfield}
                  disabled={!isAdmin}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.textfield}>
                  <InputLabel htmlFor="domains">Domain</InputLabel>
                  <Select
                    name="source_domain"
                    value={values.source_domain}
                    error={touched.source_domain && !!errors.source_domain}
                    onChange={e =>
                      setFieldValue("source_domain", e.target.value)
                    }
                    onBlur={() => setFieldTouched("source_domain", true)}
                    input={<Input id="domains" />}
                    disabled={!isAdmin}
                  >
                    {this.props.domains.map(domain => (
                      <MenuItem key={domain.id} value={domain.domain}>
                        {domain.domain}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.source_domain && errors.source_domain}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={touched.destination && !!errors.destination}
                  helperText={touched.destination && errors.destination}
                  id="destination"
                  label="Destination Email"
                  name="destination"
                  type="email"
                  value={values.destination}
                  onChange={handleChange}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
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
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.button}
                >
                  {update ? "Update Alias" : "Save Alias"}
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
  isAdmin: state.authentication.admin,
  username: state.authentication.email.split("@")[0],
  domain: state.authentication.email.split("@")[1],
  domains: state.data.domains,
  aliases: state.data.aliases
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { getAll }
  )
);

export default enhance(AccountForm);
