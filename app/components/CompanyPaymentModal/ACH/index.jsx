import React from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';

import PlaidLink from './PlaidLink';

const ACH = ({
  dispatchSetModalAlerts,
  dispatchUpdatePaymentMethod,
  plaidToken,
}) => (
  <AsyncRender
    asyncData={plaidToken}
    component={PlaidLink}
    propsToPassDown={{
      dispatchSetModalAlerts,
      dispatchUpdatePaymentMethod,
      plaidToken,
    }}
  />
);

ACH.propTypes = {
  dispatchSetModalAlerts: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  plaidToken: T.string.isRequired,
};

export default ACH;
