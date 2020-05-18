import React from 'react';
import T from 'prop-types';

import { StyledModalDialog } from './styledComponents';

const ModalDialog = ({ Component, open, propsToPassDown, ...restProps }) => (
  <StyledModalDialog
    BackdropProps={{ classes: { root: 'backdrop' } }}
    classes={{ paper: 'paper' }}
    disableAutoFocus
    open={open}
    {...restProps}
  >
    <Component {...propsToPassDown} />
  </StyledModalDialog>
);

ModalDialog.propTypes = {
  Component: T.oneOfType([T.func, T.node, T.object]).isRequired,
  open: T.bool.isRequired,
  propsToPassDown: T.object,
};

export default ModalDialog;
