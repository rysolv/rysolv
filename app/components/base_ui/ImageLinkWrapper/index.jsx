import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { StyledImage } from './styledComponents';

const ImageLinkWrapper = ({
  alt,
  image,
  isSquare,
  onClick,
  route,
  size,
  ...restProps
}) => (
  <Link onClick={onClick} to={route}>
    <StyledImage
      alt={alt}
      isSquare={isSquare || false}
      size={size}
      src={image}
      {...restProps}
    />
  </Link>
);

ImageLinkWrapper.propTypes = {
  alt: T.string.isRequired,
  image: T.string.isRequired,
  isSquare: T.bool,
  onClick: T.func,
  route: T.string.isRequired,
  size: T.string,
};

export default ImageLinkWrapper;
