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

const PaymentSuccessView = ({ fundedAmount, handleIncrement }) => {
  setTimeout(() => handleIncrement({ step: 1 }), 50000);
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
          onClick={() => handleIncrement({ step: 1 })}
        />
      </SuccessContentWrapper>
    </div>
  );
};

PaymentSuccessView.propTypes = {
  fundedAmount: T.number.isRequired,
  handleIncrement: T.func.isRequired,
};

export default PaymentSuccessView;
