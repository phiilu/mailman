import styled from "styled-components";
import React from "react";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: rgba(0, 0, 0, 0.02);
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid #f50057;
  p {
    margin: 0;
    font-weight: 300;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <Typography variant="body1" component="p" data-test="graphql-error">
          <strong>Oh no!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </Typography>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <Typography variant="body1" component="p" data-test="graphql-error">
        <strong>Oh no!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </Typography>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.object
};

export default DisplayError;
