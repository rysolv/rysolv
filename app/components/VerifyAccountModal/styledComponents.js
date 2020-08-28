import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { PrimaryButton } from 'components/base_ui';

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const StyledBodyMessage = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 2rem 0;
  text-align: justify;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: #bdbdbd;

  &:hover {
    background-color: #bdbdbd;
  }
`;

export const StyledTitle = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;

export const VerifyAccountContainer = styled.div`
  padding: 2rem;
`;
