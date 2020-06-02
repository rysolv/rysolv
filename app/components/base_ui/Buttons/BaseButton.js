import React from 'react';
import T from 'prop-types';
import Button from '@material-ui/core/Button';
import ConditionalRender from '../ConditionalRender';

const BaseButton = ({ Icon, label, ClassName, onClick, ...restProps }) => (
  <Button
    classes={{ label: 'label', root: 'root' }}
    onClick={onClick}
    variant="contained"
    {...restProps}
  >
    <ConditionalRender
      ClassName={ClassName}
      Component={Icon}
      shouldRender={!!Icon}
    />
    {label}
  </Button>
);

BaseButton.propTypes = {
  ClassName: T.string,
  Icon: T.oneOfType([T.object, T.func]),
  label: T.oneOfType([T.string, T.element]),
  onClick: T.func,
};

export default BaseButton;
