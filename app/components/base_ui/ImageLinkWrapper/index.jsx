import React from 'react';
import T from 'prop-types';

import { StyledImage, StyledLink } from './styledComponents';

const ImageLinkWrapper = ({
  alt,
  disabled,
  image,
  isSquare,
  onClick,
  route,
  size,
  ...restProps
}) => (
  <StyledLink disabled={disabled} onClick={onClick} to={route}>
    <StyledImage
      alt={alt}
      isSquare={isSquare || false}
      size={size}
      src={image}
      {...restProps}
    />
  </StyledLink>
);

ImageLinkWrapper.defaultProps = { disabled: false };

ImageLinkWrapper.propTypes = {
  alt: T.string.isRequired,
  disabled: T.bool,
  image: T.string.isRequired,
  isSquare: T.bool,
  onClick: T.func,
  route: T.string.isRequired,
  size: T.string,
};

export default ImageLinkWrapper;
