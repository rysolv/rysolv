import React from 'react';
import T from 'prop-types';

import { IconButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  IconWrapper,
  PaymentPortalContainer,
  StyledPaymentPortal,
} from './styledComponents';

const closeIcon = iconDictionary('close');

const PaymentPortalModal = ({
  balance,
  email,
  firstName,
  fundedAmount,
  handleClose,
  handleNav,
  isSignedIn,
  issueId,
  lastName,
  open,
  userId,
}) => (
  <PaymentPortalContainer>
    <IconWrapper>
      <IconButton
        icon={closeIcon}
        label="Close"
        onClick={() => handleClose()}
      />
    </IconWrapper>
    <StyledPaymentPortal
      balance={balance}
      email={email}
      firstName={firstName}
      fundedAmount={fundedAmount}
      handleNav={handleNav}
      isSignedIn={isSignedIn}
      issueId={issueId}
      lastName={lastName}
      open={open}
      removeBorder
      userId={userId}
    />
  </PaymentPortalContainer>
);

PaymentPortalModal.propTypes = {
  balance: T.number,
  email: T.string,
  firstName: T.string,
  fundedAmount: T.number,
  handleClose: T.func,
  handleNav: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  lastName: T.string,
  open: T.bool,
  userId: T.string,
};

export default PaymentPortalModal;
