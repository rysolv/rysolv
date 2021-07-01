/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

import { ModalDialog } from 'components/base_ui';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, tablet } = mediaQueriesByDevice;

export const AppBodyWrapper = styled.div`
  padding-bottom: ${({ isLandingPage }) => (isLandingPage ? '0' : '16rem')};
`;

export const AppContentWrapper = styled.div`
  display: flex;
`;

export const RoutesWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: ${({ isLandingPage }) => (isLandingPage ? '0' : '0 5% 3.6rem 5%')};
  width: 100%;

  ${tablet} {
    padding: ${({ isLandingPage }) => (isLandingPage ? '0' : '0 1rem 3.6rem 1rem')};
  }

  ${mobile} {
    margin-bottom: ${({ isLandingPage }) => (isLandingPage ? '0' : '10rem')};
    padding-top: ${({ isLandingPage }) => (isLandingPage ? '0' : '10rem')};
  }
`;

export const StyledModalDialog = styled(({ isPaymentModal, ...restProps }) => (
  <ModalDialog {...restProps} />
))`
  .paper {
    width: ${({ isPaymentModal }) => (isPaymentModal ? '40rem' : 'initial')};
  }
`;
