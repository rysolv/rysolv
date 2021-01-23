import React from 'react';
import T from 'prop-types';

import { ConditionalRender, PaypalButton } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  ChargeBreakdownWrapper,
  ChargeTitle,
  ChargeValue,
  PaypalContainer,
  TextWrapper,
  Title,
  Value,
} from './styledComponents';

const PaypalView = ({
  dispatchPaypalPayment,
  dollarValue,
  emailValue,
  handleValidateInput,
  initialValue,
  isPaypalPaymentOpen,
  issueId,
  setFundValue,
}) => {
  const fundAmount = Number(dollarValue);
  const feeValue = fundAmount * 0.03 + 0.3;
  const totalValue = fundAmount + feeValue;
  return (
    <ConditionalRender
      Component={
        <PaypalContainer>
          <TextWrapper>
            A 3% + $0.30 standard transaction fee will be added to cover paypal
            processing and the safe transfer of funds.
          </TextWrapper>
          <ChargeBreakdownWrapper>
            <ChargeTitle>
              <Title>Transaction fee</Title>
              <Title isBold>Total due today</Title>
            </ChargeTitle>
            <ChargeValue>
              <Value>{formatDollarAmount(parseFloat(feeValue, 10))}</Value>
              <Value isBold>
                {formatDollarAmount(parseFloat(totalValue, 10))}
              </Value>
            </ChargeValue>
          </ChargeBreakdownWrapper>
          <PaypalButton
            dispatchPaypalPayment={dispatchPaypalPayment}
            dollarValue={dollarValue}
            emailValue={emailValue}
            handleValidateInput={handleValidateInput}
            initialValue={initialValue}
            issueId={issueId}
            setFundValue={setFundValue}
          />
        </PaypalContainer>
      }
      shouldRender={isPaypalPaymentOpen}
    />
  );
};

PaypalView.propTypes = {
  dispatchPaypalPayment: T.func.isRequired,
  dollarValue: T.string.isRequired,
  emailValue: T.string.isRequired,
  handleValidateInput: T.func.isRequired,
  initialValue: T.string.isRequired,
  isPaypalPaymentOpen: T.bool.isRequired,
  issueId: T.string.isRequired,
  setFundValue: T.func.isRequired,
};

export default PaypalView;
