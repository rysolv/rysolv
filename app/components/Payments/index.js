import React from 'react';
import T from 'prop-types';

import { paymentsStepDictionary } from './stepDictionary';
import { PaymentContainer } from './styledComponents';

const PaymentPortal = ({ removeBorder, step, ...restProps }) => {
  const Component = paymentsStepDictionary[step];

  return (
    <PaymentContainer removeBorder={removeBorder}>
      <Component {...restProps} />
    </PaymentContainer>
  );
};

PaymentPortal.defaultProps = { removeBorder: false };

PaymentPortal.propTypes = {
  removeBorder: T.bool,
  step: T.number.isRequired,
};

export default PaymentPortal;
