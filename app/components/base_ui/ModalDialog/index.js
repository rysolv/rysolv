import React from 'react';
import T from 'prop-types';

import { StyledModalDialog } from './styledComponents';

const ModalDialog = ({ children, open, ...restProps }) => (
  <StyledModalDialog
    BackdropProps={{ classes: { root: 'backdrop' } }}
    classes={{ paper: 'paper' }}
    disableAutoFocus
    open={open}
    {...restProps}
  >
    {children}
  </StyledModalDialog>
);

ModalDialog.propTypes = {
  children: T.node.isRequired,
  open: T.bool.isRequired,
};

export default ModalDialog;
