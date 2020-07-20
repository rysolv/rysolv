import styled from 'styled-components';

import { PrimaryAsyncButton } from 'components/base_ui';
import { buttonRed, defaultFontSize, textColor } from 'defaultStyleHelper';

export const AccountContainer = styled.div`
  height: 100%;
`;

export const DeleteText = styled.span`
  color: ${textColor};
  font-size: 1.6rem;
`;

export const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconButtonWrapper = styled.div`
  align-self: center;
  display: flex;
  height: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  background-color: ${buttonRed};
  font-size: ${defaultFontSize};
  margin: 2rem 0;
  width: fit-content;

  &:hover {
    background-color: ${buttonRed};
  }
`;
