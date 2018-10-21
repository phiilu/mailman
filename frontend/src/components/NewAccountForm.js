/***
 * This form can only be used inside an Material UI Dialog
 * @author Florian Kapfenberger <florian@kapfenberger.me>
 */
import React, { Component } from "react";
import { compose } from "redux";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import styled from "styled-components";
import gql from "graphql-tag";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/lab/Slider";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { FETCH_ALL_DOMAINS_QUERY } from "../pages/Dashboard";
import { GET_ACCOUNTS_FOR_DOMAIN_QUERY } from "../components/DomainTable";
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CREATE_ACCOUNT_MUTATION(
    $email: String!
    $password: String!
    $quota: Int
    $enabled: Int
    $sendonly: Int
  ) {
    createAccount(
      email: $email
      password: $password
      quota: $quota
      enabled: $enabled
      sendonly: $sendonly
    ) {
      id
      email
    }
  }
`;

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
      this.setState({ domain: domain.domain });
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
    const { classes, handleClose, domain } = this.props;
    return (
      <Mutation
        mutation={CREATE_ACCOUNT_MUTATION}
        refetchQueries={[
          { query: GET_ACCOUNTS_FOR_DOMAIN_QUERY, variables: { id: domain.id } }
        ]}
        update={(cache, { data: { createAccount: account } }) => {
          // get domains from cache
          const { domains } = cache.readQuery({
            query: FETCH_ALL_DOMAINS_QUERY
          });
          console.log(domains, account);
          // get the domain from the accounts email address
          const [, accountDomain] = account.email.split("@");
          // increment the count of the accounts in the domain from the user
          const newDomains = domains.map(domain => {
            if (domain.domain === accountDomain) {
              domain.accounts.count++;
            }
            return domain;
          });
          // write the change back to the cache
          cache.writeQuery({
            query: FETCH_ALL_DOMAINS_QUERY,
            data: { domains: newDomains }
          });
        }}
      >
        {(createAccount, { loading, error }) => {
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
              onSubmit={async (values, { resetForm }) => {
                await createAccount({
                  variables: {
                    email: `${values.username}@${values.domain}`,
                    password: values.password,
                    quota: values.quota,
                    enabled: values.enabled === true ? 1 : 0,
                    sendonly: values.sendonly === true ? 1 : 0
                  },
                  optimisticResponse: {
                    __typename: "Mutation",
                    createAccount: {
                      __typename: "Account",
                      id: -1,
                      email: `${values.username}@${values.domain}`
                    }
                  }
                });
                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
                setFieldValue,
                setFieldTouched
              }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
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
                            onChange={e =>
                              setFieldValue("domain", e.target.value)
                            }
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
                            <strong>
                              {humanReadableDataUnits(values.quota)}
                            </strong>
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
                            onChange={(e, value) =>
                              setFieldValue("quota", value)
                            }
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
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      variant="outlined"
                    >
                      Close
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      Sav
                      {loading ? "ing" : "e"}
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          );
        }}
      </Mutation>
    );
  }
}

const enhance = compose(withStyles(styles));

export default enhance(AccountForm);
export { CREATE_ACCOUNT_MUTATION };
