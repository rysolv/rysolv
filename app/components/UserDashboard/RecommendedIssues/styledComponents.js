import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { PrimaryButton } from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  grayColor,
  lightBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: auto;
  text-transform: initial;
`;

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

export const IssueCardContainer = styled.div`
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  color: ${blueColor};
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  padding: 1.6rem 2.4rem;
  position: relative;
  width: 100%;
`;

export const IssueCardHeader = styled.div`
  color: #a9acae;
  display: flex;
  font-size: 1.6rem;
  justify-content: space-between;
  line-height: 2.208rem;
`;

export const IssueName = styled.div`
  font-size: 1.6rem;
  line-height: 2.208rem;
  margin: 1.6rem 0;
`;

export const IssuesWrapper = styled.div`
  flex: 1;
`;

export const NoRecommendedIssuesContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const RecommendedIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const RecommendedIssuesHeader = styled.div`
  color: ${blueColor};
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 2.905rem;
`;

export const StyledButton = styled(Button)`
  color: ${lightBlueColor};
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-decoration: underline;
  text-transform: none;

  &:hover {
    background: transparent;
    color: ${lightBlueColor};
    text-decoration: underline;
  }
`;

export const StyledLink = styled(Link)`
  color: ${blueColor};
  font-weight: 700;

  &:hover {
    color: ${blueColor};
  }
`;

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-top: 3rem;
  min-width: 10rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const SolveIssueButton = styled(StyledPrimaryButton)`
  background: transparent;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  bottom: 0;
  color: ${darkBlueColor};
  position: absolute;
  right: 0;

  &:hover {
    background: transparent;
    box-shadow: none;
    color: ${darkBlueColor};
  }
`;

export const StyledSubParagraph = styled.p`
  color: ${textColor};
  font-size: 1.6rem;
`;
