import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import AboutMenu from './AboutMenu';
import {
  AboutButtonWrapper,
  AboutContainer,
  StyledDownArrow,
} from './styledComponents';

const AboutDropdown = ({ handleNav }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const documentClickHandler = () => {
      setOpen(false);
    };
    document.addEventListener('click', documentClickHandler);
    return () => document.removeEventListener('click', documentClickHandler);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = e => {
    menuClickHandler(e);
    setOpen(true);
  };
  const menuClickHandler = e => {
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    <AboutContainer>
      <AboutButtonWrapper onClick={e => handleOpen(e)}>
        About
        <StyledDownArrow />
      </AboutButtonWrapper>
      <AboutMenu
        handleClose={handleClose}
        handleNav={handleNav}
        menuClickHandler={menuClickHandler}
        open={open}
      />
    </AboutContainer>
  );
};

AboutDropdown.propTypes = { handleNav: T.func.isRequired };

export default AboutDropdown;
