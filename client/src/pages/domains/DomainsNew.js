import React, { Component } from "react";
import { connect } from "react-redux";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { saveDomain } from "../../actions/domains";

import withRoot from "../../components/hoc/withRoot";

import Navigation from "../../components/shared/Navigation";
import Wrapper from "../../components/shared/Wrapper";
import DomainForm from "../../components/forms/DomainForm";

class DomainsNew extends Component {
  handleSubmit = data => {
    return this.props.saveDomain(data);
  };

  render() {
    return (
      <div>
        <Navigation />
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              <Typography type="headline">Add Domain</Typography>
            </Grid>
            <Grid item xs={12}>
              <DomainForm submit={this.handleSubmit} />
            </Grid>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

const enhance = compose(withRoot, connect(null, { saveDomain }));

export default enhance(DomainsNew);
