import React, { Component } from "react";
import { compose } from "redux";
import { Formik } from "formik";
import * as yup from "yup";

import TextField from "@material-ui/core/TextField";
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
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import { humanReadableDataUnits } from "../lib/humanReadableDataUnits";

const SliderWrapper = styled.div`
  display: grid;
  grid-gap: 0 25px;
  grid-template-columns: 1fr 150px;
  align-content: center;
  align-items: center;

  #quota {
    grid-column: span 2;
  }
`;

const styles = {
  textfield: {
    width: "100%"
  },
  button: {
    marginBottom: "1em"
  },
  slider: {
    padding: "22px 0px"
  }
};

class AccountForm extends Component {
  state = {
    username: "",
    domain: "",
    password: "",
    quota: 0,
    enabled: true,
    sendonly: false
  };

  async componentDidMount() {
    const { domain } = this.props;

    if (domain) {
      this.setState({ domain });
    }

    this.schema = yup.object().shape({
      username: yup.string().required("The username is required"),
      domain: yup.string().required("The domain is required"),
      password: yup
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
    const { classes, submit } = this.props;
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
        onSubmit={(values, { setSubmitting, setFieldValue, resetForm }) => {
          console.log(values);
          submit(values);
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
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  id="username"
                  label="Username"
                  name="username"
                  placeholder="user"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.textfield}
                  margin="dense"
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
                    margin="dense"
                  >
                    {this.props.domains.map(domain => (
                      <MenuItem key={domain.id} value={domain.domain}>
                        {domain.domain}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.domain &&
                    errors.domain && (
                      <FormHelperText>{errors.domain}</FormHelperText>
                    )}
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
                  className={classes.textfield}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <SliderWrapper>
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
                    className={classes.textfield}
                    margin="dense"
                  />
                  <Typography id="quota-label" variant="body1">
                    Quota:{" "}
                    <strong>{humanReadableDataUnits(values.quota)}</strong>
                  </Typography>
                  <Slider
                    id="quota"
                    aria-labelledby="quota-label"
                    name="quota"
                    classes={{ container: classes.slider }}
                    value={+values.quota}
                    min={0}
                    max={10240}
                    step={1024}
                    onChange={(e, value) => setFieldValue("quota", value)}
                    onBlur={() => setFieldTouched("quota", true)}
                  />
                </SliderWrapper>
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
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={values.sendonly}
                      onChange={(event, checked) =>
                        setFieldValue("sendonly", checked)
                      }
                    />
                  }
                  label="Sendonly"
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  }
}

const enhance = compose(withStyles(styles));

export default enhance(AccountForm);
