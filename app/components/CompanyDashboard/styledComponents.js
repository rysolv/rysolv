import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import { darkBlueColor, lightBlueColor, textColor } from 'defaultStyleHelper';

export const CandidateCardGroup = styled.div`
  align-items: start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: -3rem;
  margin-top: 4rem;
`;

export const CompanyDashboardContainer = styled.div`
  width: 100%;
`;

export const CompanyDashboardTitle = styled.div`
  color: ${textColor};
  display: flex;
  font-size: 3.2rem;
  font-weight: 500;
  line-height: 3.36rem;
  padding: 2rem 2rem 1rem;
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

export const StyledIconButton = styled(IconButton)`
  align-self: center;
  display: flex;
  margin-left: 1.6rem;
  padding: 0;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${textColor};
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const StyledSubParagraph = styled.p`
  color: ${textColor};
  font-size: 1.6rem;
`;
