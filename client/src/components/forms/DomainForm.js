import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import yup from "yup";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import { toast } from "react-toastify";

import { updateDomain } from "../../actions/domains";
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
  domain: yup.string().required("The domain is required")
});

class DomainForm extends Component {
  state = {
    domain: ""
  };

  async componentDidMount() {
    if (this.props.domains.length === 0) {
      await this.props.getAll();
    }

    const { id } = this.props.match.params;
    const domain = this.props.domains.find(domain => domain.id === +id);

    if (domain) {
      this.setState({ domain: domain.domain });
    }
  }

  render() {
    const { update, classes } = this.props;
    return (
      <Formik
        initialValues={{
          domain: this.state.domain
        }}
        enableReinitialize={true}
        validationSchema={schema}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting, setValues, resetForm }) => {
          this.props
            .submit(values)
            .then(data => {
              if (this.props.update) {
                toast.success("Updated successfully!");
              } else {
                toast.success("Saved successfully!");
              }
              resetForm();
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    error={touched.domain && !!errors.domain}
                    helperText={touched.domain && errors.domain}
                    id="domain"
                    label="Domain"
                    name="domain"
                    placeholder="example.org"
                    value={values.domain}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    className={classes.textfield}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.button}
                    raised
                    color="accent"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {update ? "Update Domain" : "Save Domain"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.data.domains
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { updateDomain, getAll })
);

export default enhance(DomainForm);
