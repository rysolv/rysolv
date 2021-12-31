/* eslint-disable no-unused-vars */
import React from 'react';
import T from 'prop-types';
import { usePlaidLink } from 'react-plaid-link';

import { plaidError } from './constants';
import { StyledPrimaryButton } from './styledComponents';

const CompanyPaymentModal = ({
  dispatchSetModalError,
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
        dispatchSetModalError({ error: plaidError });
      }
    },
    token: plaidToken,
    receivedRedirectUri: null,
  };

  // Exports { open, exit, ready } funtions
  const { open } = usePlaidLink(config);

  return (
    <StyledPrimaryButton
      disabled={!open}
      onClick={() => open()}
      label="Link bank account"
    />
  );
};

CompanyPaymentModal.propTypes = {
  dispatchSetModalError: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  plaidToken: T.string.isRequired,
};

export default CompanyPaymentModal;
