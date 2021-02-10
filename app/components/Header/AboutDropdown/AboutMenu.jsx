import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import { MenuItem, StyledAboutMenu } from './styledComponents';

const AboutMenu = ({ handleClose, handleNav, menuClickHandler, open }) => {
  const handleClick = (e, route) => {
    menuClickHandler(e);
    handleClose();
    handleNav(route);
  };
  const AboutMenuComponent = (
    <StyledAboutMenu>
      <MenuItem onClick={e => handleClick(e, '/how-to')}>How It Works</MenuItem>
      <MenuItem onClick={e => handleClick(e, '/stats')}>Stats</MenuItem>
    </StyledAboutMenu>
  );
  return (
    <ConditionalRender Component={AboutMenuComponent} shouldRender={open} />
  );
};

AboutMenu.propTypes = {
  handleClose: T.func.isRequired,
  handleNav: T.func.isRequired,
  menuClickHandler: T.func.isRequired,
  open: T.bool.isRequired,
};
export default AboutMenu;
