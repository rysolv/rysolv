import styled from 'styled-components';
import { SecondaryButton } from 'components/base_ui';

import { borderColor, textColor, defaultFontSize } from 'defaultStyleHelper';

export const StatusBar = styled.div`
  display: flex;
  justify-content: space-around;
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
  width: 10rem;
  background-color: #1a237e;

  &:hover {
    background-color: #3f51b5;
  }
`;
