import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { darkBlueColor, lightBlueColor } from 'defaultStyleHelper';

export const CandidateCardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: -3rem;
  margin-top: 4rem;
`;

export const CompanyDashboardContainer = styled.div`
  width: 100%;
`;

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

export const InitialDashboardContainer = styled(CompanyDashboardContainer)`
  align-self: center;
  text-align: center;
`;

export const LinkWrapper = styled(Link)`
  color: ${lightBlueColor};
  text-decoration: underline;

  &:hover {
    color: ${lightBlueColor};
  }
`;

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const StyledSubParagraph = styled.p`
  font-size: 1.6rem;
`;
