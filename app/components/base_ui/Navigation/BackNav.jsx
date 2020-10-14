import React from 'react';
import T from 'prop-types';

import { BackIcon } from '../Icons';
import { StyledBackNav } from './styledComponents';

const BackNav = ({ label, path }) => (
  <StyledBackNav to={path}>
    <BackIcon /> {label}
  </StyledBackNav>
);

BackNav.propTypes = {
  label: T.string.isRequired,
  path: T.string.isRequired,
};

export default BackNav;
