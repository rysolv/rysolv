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

const PaymentPortalModal = ({ handleClose, step, ...restProps }) => {
  const isFirstStep = step === 1;
  return (
    <PaymentPortalContainer isFirstStep={isFirstStep}>
      <IconWrapper isFirstStep={isFirstStep}>
        <IconButton icon={closeIcon} label="Close" onClick={handleClose} />
      </IconWrapper>
      <StyledPaymentPortal isModal step={step} {...restProps} />
    </PaymentPortalContainer>
  );
};

PaymentPortalModal.propTypes = {
  handleClose: T.func.isRequired,
  step: T.number.isRequired,
};

export default PaymentPortalModal;
