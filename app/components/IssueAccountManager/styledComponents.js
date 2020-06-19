import styled from 'styled-components';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';

export const ButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin: 0;
`;

export const StyledSecondayButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid #1e88e5;
  color: #1e88e5;
  margin: 0;
  margin-right: 1rem;

  &:hover {
    background-color: white;
  }
`;
