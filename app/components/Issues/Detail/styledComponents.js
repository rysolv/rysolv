import styled from 'styled-components';

import { borderColor, subheaderFontSize, textColor } from 'defaultStyleHelper';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

export const IssueDetailWrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  width: 60%;
  min-height: 40vh;
  overflow: hidden;
  padding: 0 3rem 3rem 0;
`;

export const LeftPanel = styled.div`
  width: 5rem;
`;

export const IssueDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 3rem 3rem;
`;

export const Divider = styled.div`
  border-bottom: 1px solid ${borderColor};
  color: ${textColor};
  font-family: inherit;
  margin: 1rem 0;
  font-size: ${subheaderFontSize};
  width: 100%;
`;
