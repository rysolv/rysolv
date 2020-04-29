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
  width: 70%;
  margin: 0.5rem 1rem;
  justify-content: center;
  text-align: center;
`;

export const OrganizationCardWrapper = styled.div`
  width: 70%;
`;

export const OrganizationWrapper = styled.div`
  display: flex;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  &:hover {
    background-color: red;
  }

  background-color: red;
`;
