import React, { Fragment } from 'react';
import T from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import iconDictionary from 'utils/iconDictionary';

import ConditionalRender from '../../ConditionalRender';
import { StyledButton } from './styledComponents';

const CheckIcon = iconDictionary('check');
const CloseIcon = iconDictionary('close');

const ProgressButton = ({
  error,
  label,
  loading,
  onClick,
  success,
  ...restProps
}) => {
  const LoadingDisplay = (
    <CircularProgress className="progressWheel" size={24} />
  );

  return (
    <StyledButton
      classes={{ root: 'root' }}
      disabled={loading}
      error={error}
      onClick={onClick}
      success={success}
      variant="contained"
      {...restProps}
    >
      <ConditionalRender
        Component={<Fragment>{label}</Fragment>}
        shouldRender={!error && !loading && !success}
      />
      <ConditionalRender Component={CheckIcon} shouldRender={!!success} />
      <ConditionalRender Component={CloseIcon} shouldRender={!!error} />
      <ConditionalRender Component={LoadingDisplay} shouldRender={loading} />
    </StyledButton>
  );
};

ProgressButton.defaultProps = {
  error: false,
  loading: false,
  success: false,
};

ProgressButton.propTypes = {
  error: T.oneOfType([T.bool, T.string]),
  label: T.string.isRequired,
  loading: T.bool,
  onClick: T.func.isRequired,
  success: T.oneOfType([T.bool, T.string]),
};

export default ProgressButton;
