import React from 'react';
import T from 'prop-types';

import { StyledNavIcon } from './styledComponents';

const MobileNavIcon = ({ open, setOpen }) => (
  <StyledNavIcon open={open} onClick={() => setOpen(!open)}>
    <div />
    <div />
    <div />
  </StyledNavIcon>
);

MobileNavIcon.propTypes = {
  open: T.bool.isRequired,
  setOpen: T.func.isRequired,
};

export default MobileNavIcon;
