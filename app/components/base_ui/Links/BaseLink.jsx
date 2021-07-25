import React from 'react';
import T from 'prop-types';

import StyledLink from './styledComponents';

const BaseLink = React.forwardRef(({ label, path, ...restProps }, ref) => (
  <StyledLink classes={{ root: 'link' }} ref={ref} to={path} {...restProps}>
    {label}
  </StyledLink>
));

BaseLink.propTypes = {
  label: T.string,
  path: T.string,
};

export default BaseLink;
