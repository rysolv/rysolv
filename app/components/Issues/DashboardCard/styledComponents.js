import styled from 'styled-components';
import { PrimaryButton } from 'components/base_ui';

import {
  defaultFontSize,
  textColor,
  hoverLinkColor,
  subTextGrey,
  whiteColor,
  blueColor,
} from 'defaultStyleHelper';

export const IssueCard = styled.div`
  border-radius: 0.25rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.6rem;
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  background-color: ${whiteColor};
  width: 100%;
`;

export const IssueTitle = styled.div`
  width: 100%;
  margin: 0.5rem 0 1.5rem 0;
`;

export const RepoNameWrapper = styled.div`
  font-weight: 600;
`;

export const StyledIssueHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  justify-content: space-between;
  padding: 0.5rem 0;
  width: 100%;
`;

export const IssueCardItem = styled.div`
  align-items: center;
  color: ${subTextGrey};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1;
  padding-right: 1rem;
  display: inline-flex;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const IssueCardIconWrapper = styled.div`
  display: flex;
  margin: 0 0.25rem;
`;

export const IssueCardLabelWrapper = styled.div`
  display: inline-flex;
`;

export const CenterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 0.2rem solid ${blueColor};
  color: ${blueColor};
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
  text-transform: none;
  width: 14rem;

  &:hover {
    background: transparent;
  }
`;
