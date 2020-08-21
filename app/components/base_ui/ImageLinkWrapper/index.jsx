import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { StyledImage } from './styledComponents';

const ImageLinkWrapper = ({
  alt,
  image,
  isSquare,
  route,
  size,
  ...restProps
}) => (
  <Link to={route}>
    <StyledImage
      alt={alt}
      isSquare={isSquare}
      size={size}
      src={image}
      {...restProps}
    />
  </Link>
);

ImageLinkWrapper.defaultProps = { isSquare: false };

ImageLinkWrapper.propTypes = {
  alt: T.string.isRequired,
  image: T.string.isRequired,
  isSquare: T.bool,
  route: T.string.isRequired,
  size: T.string,
};

export default ImageLinkWrapper;
