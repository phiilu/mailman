import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

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
  }
};

class DomainForm extends Component {
  state = {
    data: {
      domain: ""
    },
    submitting: false
  };

  async componentDidMount() {
    if (this.props.domains.length === 0) {
      await this.props.getAll();
    }

    const { id } = this.props.match.params;
    const domain = this.props.domains.find(domain => domain.id === +id);

    if (domain) {
      this.setState({ data: { domain: domain.domain } });
    }
  }

  handleChange = e => {
    this.setState({ data: { ...this.state.data, domain: e.target.value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props
      .submit(this.state.data)
      .then(data => {
        if (this.props.update) {
          toast.success("Updated successfully 💥");
          this.setState({
            submitting: false
          });
        } else {
          toast.success("Saved successfully 💥");
          this.setState({
            data: { domain: "" },
            submitting: false
          });
        }
      })
      .catch(error => {
        const { message } = handleRequestError(error);
        toast.error("Error: " + message);
        this.setState({
          submitting: false
        });
      });
  };

  render() {
    const { domain } = this.state.data;
    const { update, classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="domain"
              label="Domain"
              name="domain"
              placeholder="example.org"
              value={domain}
              onChange={this.handleChange}
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
            >
              {update ? "Update Domain" : "Save Domain"}
            </Button>
          </Grid>
        </Grid>
      </form>
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
