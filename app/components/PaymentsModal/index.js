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

const PaymentPortalModal = ({ fundedAmount, handleClose, users }) => (
  <PaymentPortalContainer>
    <IconWrapper>
      <IconButton
        icon={closeIcon}
        label="Close"
        onClick={() => handleClose()}
      />
    </IconWrapper>
    <StyledPaymentPortal fundedAmount={fundedAmount} users={users} />
  </PaymentPortalContainer>
);

PaymentPortalModal.propTypes = {
  fundedAmount: T.number,
  handleClose: T.func,
  users: T.array,
};

export default PaymentPortalModal;
