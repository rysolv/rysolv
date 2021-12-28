/* eslint-disable no-unused-vars */
import React from 'react';
import T from 'prop-types';
import { usePlaidLink } from 'react-plaid-link';

import { StyledPrimaryButton } from './styledComponents';

const CompanyPaymentModal = ({
  dispatchUpdatePaymentMethod,
  plaidToken,
  setPlaidError,
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
        setPlaidError(err);
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
  dispatchUpdatePaymentMethod: T.func.isRequired,
  plaidToken: T.string.isRequired,
  setPlaidError: T.func.isRequired,
};

export default CompanyPaymentModal;
