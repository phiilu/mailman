/***
 * This form can only be used inside an Material UI Dialog
 * @author Florian Kapfenberger <florian@kapfenberger.me>
 */
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import gql from "graphql-tag";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/lab/Slider";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/core/styles";

import { GET_ACCOUNTS_FOR_DOMAIN_QUERY } from "./AccountList";
import { humanReadableDataUnits } from "../lib/humanReadableDataUnits";

import SliderWrapper from "./styles/SliderWrapper";

import { updateDomainsCache } from "../lib/apolloClient";
import { accountSchema } from "../lib/validations";

const styles = {
  textfield: {
    minWidth: "312px",
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
      username
      domain {
        id
        domain
      }
      quota
      enabled
      sendonly
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
    sendonly: false,
    showPassword: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.domain.domain !== nextProps.domain.domain) {
      this.setState({ ...this.state, domain: nextProps.domain.domain });
    }
  }

  componentDidMount() {
    const { domain } = this.props;

    if (domain) {
      this.setState({ domain: domain.domain });
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  updateAccountsCache(cache, account, domainId) {
    try {
      // get domain from cache
      const { domain } = cache.readQuery({
        query: GET_ACCOUNTS_FOR_DOMAIN_QUERY,
        variables: { id: domainId }
      });
      // add the account to the existing accounts
      domain.accounts.nodes = domain.accounts.nodes.concat(account);
      // write the change back to the cache
      cache.writeQuery({
        query: GET_ACCOUNTS_FOR_DOMAIN_QUERY,
        data: { domain }
      });
    } catch (error) {
      // Probably the data was not fetched before, so the cache throws an error
      // nothing to worry about :D
    }
  }

  render() {
    const { classes, handleClose, domain } = this.props;
    return (
      <Mutation
        mutation={CREATE_ACCOUNT_MUTATION}
        update={(cache, { data: { createAccount: account } }) => {
          updateDomainsCache(cache, { account });
          this.updateAccountsCache(cache, account, domain.id);
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
              validationSchema={accountSchema()}
              validateOnChange={false}
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
                      email: `${values.username}@${values.domain}`,
                      quota: 0,
                      domain: {
                        __typename: "Domain",
                        domain: values.domain
                      },
                      username: values.username,
                      enabled: values.enabled,
                      sendonly: values.sendonly
                    }
                  }
                });
                resetForm();
                handleClose();
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
                          autoFocus
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
                          type={this.state.showPassword ? "text" : "password"}
                          value={values.password || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.textfield}
                          margin="dense"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
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
                            max={51200}
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
                    <Button onClick={handleClose} color="secondary">
                      Close
                    </Button>
                    <Button color="primary" type="submit">
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

export default withStyles(styles)(AccountForm);
export { CREATE_ACCOUNT_MUTATION };
