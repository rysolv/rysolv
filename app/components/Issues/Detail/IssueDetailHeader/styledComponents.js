import styled from 'styled-components';

import { BaseTextInput, Verified } from 'components/base_ui';
import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';

export const IssueDetailContainer = styled.div`
  margin-bottom: 2rem;
`;

export const NameWrapper = styled.div`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1rem;
`;

export const RepoNameContainer = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  font-weight: bold;

  &:hover {
    color: ${hoverLinkColor};
  }
`;

export const StyledBaseTextInput = styled(BaseTextInput)`
  margin: 0.5rem 0;
  width: ${({ width }) => width || 'inherit'};

  .base-input {
    color: ${textColor};
    font-size: 2rem;
    font-weight: 500;
  }
`;

export const StyledIssueDetail = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  width: 100%;
`;

export const StyledVerified = styled(Verified)`
  display: flex;
  padding: 0 0.5rem;
`;
