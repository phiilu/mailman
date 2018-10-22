import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 226px;
  width: 100%;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <CircularProgress color="secondary" size={60} />
    </LoadingWrapper>
  );
}
