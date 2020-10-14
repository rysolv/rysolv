import React from 'react';
import styled from 'styled-components';

import { ModalDialog } from 'components/base_ui';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, tablet } = mediaQueriesByDevice;

export const AppBodyWrapper = styled.div`
  padding-bottom: 16rem;
`;

export const AppContentWrapper = styled.div`
  display: flex;
`;

export const RoutesWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: 0 5% 3.6rem 5%;
  width: 100%;

  ${tablet} {
    padding: 0 1rem 3.6rem 1rem;
  }

  ${mobile} {
    padding-top: 10rem;
  }
`;

export const StyledModalDialog = styled(({ isPaymentModal, ...restProps }) => (
  <ModalDialog {...restProps} />
))`
  .paper {
    width: ${({ isPaymentModal }) => (isPaymentModal ? '40rem' : 'initial')};
  }
`;
