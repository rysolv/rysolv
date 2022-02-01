/* eslint-disable no-unused-vars */
import React from 'react';
import T from 'prop-types';
import { usePlaidLink } from 'react-plaid-link';

import { plaidError } from '../constants';
import { StyledButton } from './styledComponents';

const PlaidLink = ({
  dispatchSetModalAlerts,
  dispatchUpdatePaymentMethod,
  plaidToken,
}) => {
  // Has onSuccess, onExit, onEvent properties
  const config = {
    onSuccess: (publicToken, metadata) => {
      dispatchUpdatePaymentMethod({
        metadata,
        provider: 'plaid',
        token: publicToken,
      });
    },
    onExit: (err, _metadata) => {
      // Non successful exit. Either an error, or client initiated
      if (err) {
        // Using standardized 'Something went wrong' errors for now
        // Plaid provides sanitized errors in (error.display_message)
        dispatchSetModalAlerts({ error: plaidError });
      }
    },
    token: plaidToken,
    receivedRedirectUri: null,
  };

  // Exports { exit, open, ready } funtions
  const { open } = usePlaidLink(config);

  return (
    <StyledButton disableRipple disabled={!open} onClick={open}>
      Connect a bank account
    </StyledButton>
  );
};

PlaidLink.propTypes = {
  dispatchSetModalAlerts: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  plaidToken: T.string,
};

export default PlaidLink;
