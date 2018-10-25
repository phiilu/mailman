import styled from "styled-components";

const SliderWrapper = styled.div`
  display: grid;
  grid-gap: 0 25px;
  grid-template-columns: 1fr 150px;
  align-content: center;
  align-items: center;

  .slider {
    grid-column: span 2;
  }
`;

export default SliderWrapper;
