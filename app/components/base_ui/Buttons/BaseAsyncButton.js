import React, { Fragment } from 'react';
import T from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const BaseAsyncButton = ({ Icon, label, loading, onClick, ...restProps }) => {
  const loadingDisplay = (
    <CircularProgress className="progressWheel" size={24} />
  );
  const defaultDisplay = <Fragment>{label}</Fragment>;

  return (
    <Button
      classes={{
        disabled: 'disabled',
        label: 'label',
        root: 'root',
      }}
      disabled={loading}
      onClick={onClick}
      variant="contained"
      {...restProps}
    >
      {loading ? loadingDisplay : defaultDisplay}
    </Button>
  );
};

BaseAsyncButton.propTypes = {
  Icon: T.object,
  label: T.string,
  loading: T.bool,
  onClick: T.func.isRequired,
};

export default BaseAsyncButton;
