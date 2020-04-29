import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { FlatIconButton } from 'components/base_ui';

export const IssueDetailWrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  max-width: 70%;
  min-height: 40vh;
  overflow: hidden;
  padding: 0 3rem 3rem 0;
`;

export const LeftPanel = styled.div`
  width: 3.5rem;
`;

export const UpvotePanel = styled.div`
  background-color: #e0e0e0;
  height: 15rem;
  padding: 0.5rem;
  text-align: center;
  font-size: ${defaultFontSize};
  border-radius: 0.25rem;
  width: 100%;
`;

export const IssueDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 3rem 3rem;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  min-width: 0;
  padding: 0;
`;

export const Divider = styled.div`
  border-bottom: 1px solid ${borderColor};
  color: ${textColor};
  font-family: inherit;
  margin: 1rem 0;
  font-size: ${subheaderFontSize};
  width: 100%;
`;
