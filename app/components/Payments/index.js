import React from 'react';
import T from 'prop-types';

import { paymentsStepDictionary } from './stepDictionary';

const PaymentPortal = ({ step, ...restProps }) => {
  const Component = paymentsStepDictionary[step];

  return <Component {...restProps} />;
};

PaymentPortal.propTypes = { step: T.number.isRequired };

export default PaymentPortal;
