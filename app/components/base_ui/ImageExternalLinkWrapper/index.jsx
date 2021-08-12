import React from 'react';
import T from 'prop-types';

import { anonymousUserImage } from './constants';
import { StyledImage, StyledLink } from './styledComponents';

const ImageExternalLinkWrapper = ({
  alt,
  disabled,
  image,
  isSquare,
  onClick,
  route,
  size,
  ...restProps
}) => (
  <StyledLink
    disabled={disabled}
    href={route}
    onClick={onClick}
    target="_blank"
  >
    <StyledImage
      alt={alt}
      isSquare={isSquare}
      size={size}
      src={image}
      {...restProps}
    />
  </StyledLink>
);

ImageExternalLinkWrapper.defaultProps = {
  alt: 'anonymous',
  disabled: false,
  image: anonymousUserImage,
  isSquare: false,
};

ImageExternalLinkWrapper.propTypes = {
  alt: T.string,
  disabled: T.bool,
  image: T.string,
  isSquare: T.bool,
  onClick: T.func,
  route: T.string.isRequired,
  size: T.string,
};

export default ImageExternalLinkWrapper;
