import React from 'react';
import T from 'prop-types';

import { ConditionalRender, PaypalButton } from 'components/base_ui';

import { PaypalContainer } from './styledComponents';

const PaypalView = ({
  dispatchPaypalPayment,
  isPaypalPaymentOpen,
  issueId,
  organizationId,
  total,
  userId,
}) => (
  <ConditionalRender
    Component={
      <PaypalContainer>
        <PaypalButton
          dispatchPaypalPayment={dispatchPaypalPayment}
          issueId={issueId}
          organizationId={organizationId}
          total={total}
          userId={userId}
        />
      </PaypalContainer>
    }
    shouldRender={isPaypalPaymentOpen}
  />
);

PaypalView.propTypes = {
  dispatchPaypalPayment: T.func.isRequired,
  isPaypalPaymentOpen: T.bool.isRequired,
  issueId: T.string.isRequired,
  organizationId: T.string.isRequired,
  total: T.string.isRequired,
  userId: T.string,
};

export default PaypalView;
