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
  handleClearAlerts,
  handleClose,
  handleNav,
  handleSubmitAccountPayment,
  isSignedIn,
  issueId,
  lastName,
  open,
  organizationId,
  paymentAlerts,
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
      handleClearAlerts={handleClearAlerts}
      handleNav={handleNav}
      handleSubmitAccountPayment={handleSubmitAccountPayment}
      isSignedIn={isSignedIn}
      issueId={issueId}
      lastName={lastName}
      open={open}
      organizationId={organizationId}
      paymentAlerts={paymentAlerts}
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
  handleClearAlerts: T.func,
  handleClose: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  lastName: T.string,
  open: T.bool,
  organizationId: T.string,
  paymentAlerts: T.object,
  userId: T.string,
};

export default PaymentPortalModal;
