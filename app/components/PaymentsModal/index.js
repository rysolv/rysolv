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
  fundedAmount,
  handleClose,
  handleNav,
  isSignedIn,
  issueId,
  open,
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
      fundedAmount={fundedAmount}
      handleNav={handleNav}
      isSignedIn={isSignedIn}
      issueId={issueId}
      open={open}
      removeBorder
    />
  </PaymentPortalContainer>
);

PaymentPortalModal.propTypes = {
  fundedAmount: T.number,
  handleClose: T.func,
  handleNav: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  open: T.bool,
};

export default PaymentPortalModal;
