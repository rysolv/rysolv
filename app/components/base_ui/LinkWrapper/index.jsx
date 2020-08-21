import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { StyledImage } from './styledComponents';

const LinkWrapper = ({
  alt,
  Component,
  detailRoute,
  profilePic,
  size,
  type,
}) => {
  const componentDictionary = {
    image: () => <StyledImage alt={alt} size={size} src={profilePic} />,
  };
  const ComponentToRender = Component || componentDictionary[type];
  return (
    <Link to={detailRoute}>
      <ComponentToRender />
    </Link>
  );
};

LinkWrapper.propTypes = {
  alt: T.string,
  Component: T.func,
  detailRoute: T.string.isRequired,
  profilePic: T.string,
  size: T.string,
  type: T.string,
};

export default LinkWrapper;
