import React from 'react';
import T from 'prop-types';

import StyledLink from './styledComponents';

const BaseLink = ({ label, path, ...restProps }) => (
  <StyledLink classes={{ root: 'link' }} to={path} {...restProps}>
    {label}
  </StyledLink>
);

BaseLink.propTypes = {
  label: T.string,
  path: T.string,
};

export default BaseLink;
