import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FETCH_ALL_DOMAINS_QUERY } from "../pages/Dashboard";

const styles = {
  textfield: {
    minWidth: "312px",
    width: "100%"
  },
  button: {
    marginBottom: "1em"
  }
};

const schema = yup.object().shape({
  domain: yup.string().required("The domain is required")
});

const CREATE_DOMAIN_MUTATION = gql`
  mutation CREATE_DOMAIN_MUTATION($domain: String!) {
    createDomain(domain: $domain) {
      id
      domain
      accounts {
        count
      }
    }
  }
`;

class NewDomainForm extends Component {
  state = {
    domain: ""
  };

  updateDomainsCache(cache, domain) {
    // get domains from cache
    const { domains } = cache.readQuery({
      query: FETCH_ALL_DOMAINS_QUERY
    });
    // add the domain to the existing domains
    const newDomains = domains.concat(domain);
    // write the change back to the cache
    cache.writeQuery({
      query: FETCH_ALL_DOMAINS_QUERY,
      data: { domains: newDomains }
    });
  }

  render() {
    const { classes, handleClose } = this.props;
    return (
      <Mutation
        mutation={CREATE_DOMAIN_MUTATION}
        update={(cache, { data: { createDomain: domain } }) => {
          this.updateDomainsCache(cache, domain);
        }}
      >
        {(createDomain, { loading }) => {
          return (
            <Formik
              initialValues={{
                domain: this.state.domain
              }}
              enableReinitialize={true}
              validationSchema={schema}
              validateOnChange={true}
              onSubmit={async (values, { resetForm }) => {
                await createDomain({
                  variables: values,
                  optimisticResponse: {
                    __typename: "Mutation",
                    createDomain: {
                      __typename: "Domain",
                      id: -1,
                      domain: values.domain,
                      accounts: {
                        __typename: "AccountList",
                        count: 0
                      }
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
                isSubmitting
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      <Grid container spacing={8}>
                        <Grid item xs={12}>
                          <TextField
                            autoFocus
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
                            InputLabelProps={{
                              shrink: true
                            }}
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
                );
              }}
            </Formik>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(NewDomainForm);
