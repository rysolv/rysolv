import React from 'react';
import T from 'prop-types';
import { BackIcon } from '../Icons';
import { StyledBackNav } from './styledComponents';

const BackNav = ({ label, path, handleNav }) => (
  <StyledBackNav
    href={path}
    onClick={e => {
      e.preventDefault();
      handleNav(path);
    }}
  >
    <BackIcon /> {label}
  </StyledBackNav>
);

BackNav.propTypes = {
  label: T.string,
  path: T.string,
  handleNav: T.func,
};

export default BackNav;
