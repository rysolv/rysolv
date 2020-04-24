import styled from 'styled-components';

import { borderColor, moneyGreen, textColor } from 'defaultStyleHelper';
import { FlatIconButton, SecondaryButton } from 'components/base_ui';

export const IssueDetailWrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  margin: 0;
  max-width: 75rem;
  min-height: 40vh;
  overflow: hidden;
  padding: 0 3rem 3rem 0;
`;

export const LeftPanel = styled.div`
  width: 3rem;
`;

export const UpvotePanel = styled.div`
  background-color: #e0e0e0;
  height: 15rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.25rem;
  width: 100%;
`;

export const IssueDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 3rem 3rem;
`;

export const DollarWrapper = styled.div`
  background-color: ${moneyGreen};
  border-radius: 1rem;
  color: white;
  padding: 0.25rem 1rem 0.25rem 1rem;
  text-align: center;
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
  font-size: 1.4rem;
  width: 100%;
`;

// Status bar things
export const StatusBar = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StatusItem = styled.div`
  margin: 1rem;
  text-align: center;
`;

export const StatusTitle = styled.div`
  font-size: 1.3rem;
  color: ${textColor};
  padding: 0 0 0.5rem 0;
  border-bottom: 1px solid ${borderColor};
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  width: 10rem;
  background-color: #1a237e;

  &:hover {
    background-color: #3f51b5;
  }
`;
