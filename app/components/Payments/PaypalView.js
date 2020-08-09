import React from 'react';
import T from 'prop-types';

import { ConditionalRender, PaypalButton } from 'components/base_ui';

import { PaypalContainer, TextWrapper } from './styledComponents';

const PaypalView = ({
  dispatchPaypalPayment,
  dollarValue,
  handleValidateInput,
  isPaypalPaymentOpen,
  issueId,
  organizationId,
  userId,
}) => (
  <ConditionalRender
    Component={
      <PaypalContainer>
        <TextWrapper>
          A 3.6% standard transaction fee will be added to cover paypal
          processing and the safe transfer of funds.
        </TextWrapper>
        <PaypalButton
          dispatchPaypalPayment={dispatchPaypalPayment}
          dollarValue={dollarValue}
          handleValidateInput={handleValidateInput}
          issueId={issueId}
          organizationId={organizationId}
          userId={userId}
        />
      </PaypalContainer>
    }
    shouldRender={isPaypalPaymentOpen}
  />
);

PaypalView.propTypes = {
  dispatchPaypalPayment: T.func.isRequired,
  dollarValue: T.string.isRequired,
  handleValidateInput: T.func.isRequired,
  isPaypalPaymentOpen: T.bool.isRequired,
  issueId: T.string.isRequired,
  organizationId: T.string.isRequired,
  userId: T.string,
};

export default PaypalView;
