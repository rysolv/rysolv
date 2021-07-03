import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import ConditionalRender from '../../ConditionalRender';
import { styleDictionary } from './constants';
import { ProgressBar, StyledButton } from './styledComponents';

const CheckIcon = iconDictionary('check');

const ProgressButton = ({
  disabled,
  error,
  label,
  loading,
  onClick,
  success,
  ...restProps
}) => {
  const hasErrorOrSuccess = !!error || !!success;
  const errorLabel = error ? 'error' : undefined;
  const successLabel = success ? 'success' : undefined;
  const dictionaryLabel = errorLabel || successLabel;
  const style = styleDictionary[dictionaryLabel];

  return (
    <StyledButton
      classes={{ disabled: 'disabled', root: 'root' }}
      disabled={disabled || error || loading || success}
      hasErrorOrSuccess={hasErrorOrSuccess}
      onClick={onClick}
      style={style}
      {...restProps}
    >
      <ConditionalRender
        Component={<Fragment>Send</Fragment>}
        shouldRender={!error && !loading && !success}
      />
      <ConditionalRender
        Component={<Fragment>Sending...</Fragment>}
        shouldRender={loading}
      />
      <ConditionalRender
        Component={<Fragment>{CheckIcon} Delivered</Fragment>}
        shouldRender={!!success}
      />
      <ConditionalRender
        Component={<Fragment>Error</Fragment>}
        shouldRender={!!error}
      />
      <ConditionalRender Component={<ProgressBar />} shouldRender={loading} />
    </StyledButton>
  );
};

ProgressButton.defaultProps = {
  disabled: false,
  error: false,
  loading: false,
  success: false,
};

ProgressButton.propTypes = {
  disabled: T.bool,
  error: T.oneOfType([T.bool, T.string]),
  label: T.string.isRequired,
  loading: T.bool,
  onClick: T.func.isRequired,
  success: T.oneOfType([T.bool, T.string]),
};

export default ProgressButton;
