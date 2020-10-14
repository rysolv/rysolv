import React from 'react';
import T from 'prop-types';

import { paymentsStepDictionary } from './stepDictionary';
import { PaymentContainer } from './styledComponents';

const PaymentPortal = ({ isModal, step, ...restProps }) => {
  const Component = paymentsStepDictionary[step];

  return (
    <PaymentContainer isModal={isModal}>
      <Component {...restProps} />
    </PaymentContainer>
  );
};

PaymentPortal.defaultProps = { isModal: false };

PaymentPortal.propTypes = {
  isModal: T.bool,
  step: T.number.isRequired,
};

export default PaymentPortal;
