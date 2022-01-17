import React from 'react';
import T from 'prop-types';

import StyledLink from './styledComponents';

const BaseLink = React.forwardRef(
  (
    { label, path, shouldRemoveFirst, shouldRemoveSecond, ...restProps },
    ref,
  ) => (
    <StyledLink classes={{ root: 'link' }} ref={ref} to={path} {...restProps}>
      {label}
    </StyledLink>
  ),
);

BaseLink.defaultProps = { shouldRemoveFirst: false, shouldRemoveSecond: false };

BaseLink.propTypes = {
  label: T.string,
  path: T.string,
  shouldRemoveFirst: T.bool,
  shouldRemoveSecond: T.bool,
};

export default BaseLink;
