import React from 'react';
import T from 'prop-types';

import { ConditionalRender, PaypalButton } from 'components/base_ui';

import { PaypalContainer } from './styledComponents';

const PaypalView = ({ isPaypalPaymentOpen }) => (
  <ConditionalRender
    Component={
      <PaypalContainer>
        <PaypalButton />
      </PaypalContainer>
    }
    shouldRender={isPaypalPaymentOpen}
  />
);

PaypalView.propTypes = { isPaypalPaymentOpen: T.bool.isRequired };

export default PaypalView;
