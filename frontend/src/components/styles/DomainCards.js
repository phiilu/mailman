import styled from "styled-components";

const DomainCards = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 1fr;
  align-items: center;
  margin: 25px 0;
`;

export default DomainCards;
