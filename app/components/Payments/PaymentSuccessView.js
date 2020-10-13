import React from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  StyledSecondaryButton,
  SuccessContentWrapper,
  SuccessHeader,
  SuccessIconWrapper,
  SuccessText,
} from './styledComponents';

const BackIcon = iconDictionary('backArrow');

const PaymentSuccessView = ({
  fundedAmount,
  handleClearPaymentAlerts,
  handleIncrement,
}) => {
  const handleBack = () => {
    handleClearPaymentAlerts();
    handleIncrement({ step: 1 });
  };
  setTimeout(handleBack, 5000);
  return (
    <div>
      <SuccessIconWrapper>
        {formatDollarAmount(fundedAmount)}
      </SuccessIconWrapper>
      <SuccessContentWrapper>
        <SuccessHeader>Awesome!</SuccessHeader>
        <SuccessText>Thank you for contributing to this issue.</SuccessText>
        <StyledSecondaryButton
          Icon={BackIcon}
          label="Back"
          onClick={handleBack}
        />
      </SuccessContentWrapper>
    </div>
  );
};

PaymentSuccessView.propTypes = {
  fundedAmount: T.number.isRequired,
  handleClearPaymentAlerts: T.func.isRequired,
  handleIncrement: T.func.isRequired,
};

export default PaymentSuccessView;
