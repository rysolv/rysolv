import React from 'react';
import T from 'prop-types';

import { StyledModalDialog } from './styledComponents';

const ModalDialog = ({ Component, open, propsToPassDown, ...restProps }) => {
  const { handleClose } = propsToPassDown;
  return (
    <StyledModalDialog
      BackdropProps={{ classes: { root: 'backdrop' } }}
      classes={{ paper: 'paper' }}
      disableAutoFocus
      disableEnforceFocus
      open={open}
      onClose={handleClose}
      {...restProps}
    >
      <Component {...propsToPassDown} />
    </StyledModalDialog>
  );
};

ModalDialog.propTypes = {
  Component: T.oneOfType([T.func, T.node, T.object]).isRequired,
  open: T.bool.isRequired,
  propsToPassDown: T.object,
};

export default ModalDialog;
