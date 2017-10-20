import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { updateDomain } from "../../actions/domains";
import { getAll } from "../../actions/data";

import withRoot from "../../components/hoc/withRoot";

import Navigation from "../../components/shared/Navigation";
import Wrapper from "../../components/shared/Wrapper";
import DomainForm from "../../components/forms/DomainForm";

class DomainsNew extends Component {
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

  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateDomain(id, data);
  };

  render() {
    return (
      <div>
        <Navigation />
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              <Typography type="headline">Edit Domain</Typography>
            </Grid>
            <Grid item xs={12}>
              <DomainForm
                domain={this.state.domain}
                submit={this.handleSubmit}
                update
              />
            </Grid>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.data.domains
});

const enhance = compose(
  withRoot,
  withRouter,
  connect(mapStateToProps, { updateDomain, getAll })
);

export default enhance(DomainsNew);
