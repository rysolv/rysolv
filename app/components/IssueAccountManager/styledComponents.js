import styled from 'styled-components';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import { lightBlueColor } from 'defaultStyleHelper';

export const ButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin: 0;
`;

export const StyledSecondayButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};
  margin: 0 1rem 0 0;

  &:hover {
    background-color: white;
  }
`;
