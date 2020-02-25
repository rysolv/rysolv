import React from 'react';
import T from 'prop-types';
import Button from '@material-ui/core/Button';

const BaseButton = ({ Icon, label, onClick, ...restProps }) => (
  <Button
    classes={{ label: 'label', root: 'root' }}
    onClick={onClick}
    variant="contained"
    {...restProps}
  >
    {label}
  </Button>
);

BaseButton.propTypes = {
  Icon: T.oneOfType([T.object, T.func]),
  label: T.oneOfType([T.string, T.element]),
  onClick: T.func,
};

export default BaseButton;
