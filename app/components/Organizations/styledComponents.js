import styled from 'styled-components';

import { PrimaryAsyncButton } from 'components/base_ui';
import { textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 55rem;
  justify-content: center;
  margin: 0.5rem 1rem;
  text-align: center;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  &:hover {
    background-color: red;
  }

  background-color: red;
`;
