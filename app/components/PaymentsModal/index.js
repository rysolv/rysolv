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
  fundedAmount,
  handleClearAlerts,
  handleClose,
  handleNav,
  handleSubmitAccountPayment,
  isSignedIn,
  issueId,
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
      fundedAmount={fundedAmount}
      handleClearAlerts={handleClearAlerts}
      handleNav={handleNav}
      handleSubmitAccountPayment={handleSubmitAccountPayment}
      isSignedIn={isSignedIn}
      issueId={issueId}
      paymentAlerts={paymentAlerts}
      removeBorder
      userId={userId}
    />
  </PaymentPortalContainer>
);

PaymentPortalModal.propTypes = {
  balance: T.number,
  fundedAmount: T.number,
  handleClearAlerts: T.func,
  handleClose: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  paymentAlerts: T.object,
  userId: T.string,
};

export default PaymentPortalModal;
