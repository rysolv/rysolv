import React, { useCallback } from 'react';
import T from 'prop-types';

import { anonymousUserImage } from './constants';
import { StyledImage, StyledLink } from './styledComponents';

const ImageLinkWrapper = ({
  alt,
  disabled,
  image,
  isSquare,
  isCircle,
  onClick,
  route,
  size,
  ...restProps
}) => {
  const onLoadHandler = useCallback(
    e => {
      if (!isCircle) {
        if (e.target.naturalWidth > e.target.naturalHeight) {
          e.target.style.width = size;
          e.target.style.height = 'auto';
        } else {
          e.target.style.width = 'auto';
          e.target.style.height = size;
        }
      }
    },
    [isCircle],
  );

  return (
    <StyledLink disabled={disabled} onClick={onClick} to={route}>
      <StyledImage
        alt={alt}
        isCircle={isCircle}
        isSquare={isSquare}
        onLoad={onLoadHandler}
        size={size}
        src={image}
        {...restProps}
      />
    </StyledLink>
  );
};

ImageLinkWrapper.defaultProps = {
  alt: 'anonymous',
  disabled: false,
  image: anonymousUserImage,
  isCircle: true,
  isSquare: false,
};

ImageLinkWrapper.propTypes = {
  alt: T.string,
  disabled: T.bool,
  image: T.string,
  isCircle: T.bool,
  isSquare: T.bool,
  onClick: T.func,
  route: T.string.isRequired,
  size: T.string,
};

export default ImageLinkWrapper;
