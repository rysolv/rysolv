import React from 'react';
import T from 'prop-types';

const PaymentSuccessView = ({ alerts: { success } }) => (
  <div>{success.message}</div>
);

PaymentSuccessView.propTypes = {
  alerts: T.object.isRequired,
};

export default PaymentSuccessView;
