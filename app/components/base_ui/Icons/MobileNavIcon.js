import React, { useState } from 'react';

import { StyledNavIcon } from './styledComponents';

const MobileNavIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledNavIcon open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledNavIcon>
  );
};

export default MobileNavIcon;
