import React from 'react';
import T from 'prop-types';

import { anonymousUserImage } from './constants';
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

ImageLinkWrapper.defaultProps = {
  alt: 'anonymous',
  disabled: false,
  image: anonymousUserImage,
};

ImageLinkWrapper.propTypes = {
  alt: T.string,
  disabled: T.bool,
  image: T.string,
  isSquare: T.bool,
  onClick: T.func,
  route: T.string.isRequired,
  size: T.string,
};

export default ImageLinkWrapper;
