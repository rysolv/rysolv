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

const PaymentPortalModal = ({ fundedAmount, handleClose, isSignedIn }) => (
  <PaymentPortalContainer>
    <IconWrapper>
      <IconButton
        icon={closeIcon}
        label="Close"
        onClick={() => handleClose()}
      />
    </IconWrapper>
    <StyledPaymentPortal
      fundedAmount={fundedAmount}
      isSignedIn={isSignedIn}
      removeBorder
    />
  </PaymentPortalContainer>
);

PaymentPortalModal.propTypes = {
  fundedAmount: T.number,
  handleClose: T.func,
  isSignedIn: T.bool,
};

export default PaymentPortalModal;
