import styled from 'styled-components';
import { SecondaryButton } from 'components/base_ui';

import { borderColor, textColor, defaultFontSize } from 'defaultStyleHelper';

export const StatusBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-wrap: wrap;
`;

export const StatusItem = styled.div`
  margin: 1rem;
  text-align: center;
`;

export const StatusTitle = styled.div`
  font-size: ${defaultFontSize};
  color: ${textColor};
  padding: 0 0 0.5rem 0;
  border-bottom: 1px solid ${borderColor};
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  min-width: 5rem;
  width: 70%;
  background-color: #1a237e;

  &:hover {
    background-color: #3f51b5;
  }
`;
