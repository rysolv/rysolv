import styled from 'styled-components';

import { Verified } from 'components/base_ui';
import { defaultFontSize, detailFontSize, textColor } from 'defaultStyleHelper';

export const IssueDetailContainer = styled.div`
  margin-bottom: 2rem;
`;

export const NameWrapper = styled.div`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1rem;
`;

export const OrganizationNameContainer = styled.a`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  font-weight: bold;

  &:hover {
    color: #007bff;
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
  padding: 0 0.5rem;
  display: flex;
`;
