import styled from 'styled-components';
import { detailFontSize, borderColor } from 'defaultStyleHelper';

export const StyledExistingOrganizations = styled.div`
  font-size: ${detailFontSize};
  text-align: center;
  width: 100%;
  padding: 0 3rem;
`;

export const OrganizationCard = styled.div`
  border: 0.1rem solid ${borderColor};
  padding: 1rem;
  border-radius: 0.2rem;
  margin: 0.5rem 0;
`;
