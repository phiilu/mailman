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
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";
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

const schema = yup.object().shape({
  domain: yup.string().required("The domain is required"),
  params: yup.string().required("Params is required"),
  policy: yup.string().required("Policy is required")
});

class TlsPolicyForm extends Component {
  state = {
    domain: "",
    params: "",
    policy: "dane"
  };

  async componentDidMount() {
    if (this.props.tlspolicies.length === 0) await this.props.getAll();

    const { id } = this.props.match.params;
    const tlsPolicy = this.props.tlspolicies.find(
      tlsPolicy => tlsPolicy.id === +id
    );

    if (tlsPolicy) {
      this.setState({
        domain: tlsPolicy.domain,
        params: tlsPolicy.params,
        policy: tlsPolicy.policy
      });
    }
  }

  render() {
    const { update, classes } = this.props;
    return (
      <Formik
        initialValues={{
          domain: this.state.domain,
          params: this.state.params,
          policy: this.state.policy
        }}
        enableReinitialize={true}
        validationSchema={schema}
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
                setSubmitting(false);
              } else {
                toast.success("Saved successfully!");
                resetForm();
              }
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
          isValid,
          setFieldValue,
          setFieldTouched
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  error={touched.domain && !!errors.domain}
                  helperText={touched.domain && errors.domain}
                  id="domain"
                  label="Domain"
                  name="domain"
                  placeholder="google.com"
                  value={values.domain}
                  onChange={handleChange}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.textfield}>
                  <InputLabel htmlFor="policies">Policy</InputLabel>
                  <Select
                    name="policy"
                    value={values.policy}
                    onChange={e => setFieldValue("policy", e.target.value)}
                    input={<Input id="policies" />}
                    className={classes.textfield}
                  >
                    <MenuItem value="dane">
                      <em>dane</em>
                    </MenuItem>
                    <MenuItem value="dane-only">
                      <em>dane-only</em>
                    </MenuItem>
                    <MenuItem value="fingerprint">
                      <em>fingerprint</em>
                    </MenuItem>
                    <MenuItem value="verify">
                      <em>verify</em>
                    </MenuItem>
                    <MenuItem value="secure">
                      <em>secure</em>
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.policy && errors.policy}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={touched.params && !!errors.params}
                  helperText={touched.params && errors.params}
                  id="params"
                  label="Params"
                  name="params"
                  placeholder="match=.some.domain"
                  value={values.params}
                  onChange={handleChange}
                  margin="normal"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  raised
                  color="accent"
                  type="submit"
                  disabled={this.state.submitting}
                  className={classes.button}
                >
                  {update ? "Update TLS Policy" : "Save TLS Policy"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  }
}

TlsPolicyForm.propTypes = {
  update: PropTypes.bool
};

TlsPolicyForm.defaultProps = {
  update: false
};

const mapStateToProps = state => ({
  tlspolicies: state.data.tlspolicies
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { getAll })
);

export default enhance(TlsPolicyForm);
