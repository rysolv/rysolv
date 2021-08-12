import React from 'react';
import T from 'prop-types';

import {
  CircleOne,
  CircleThree,
  CircleTwo,
  CircleWrapper,
  Image,
  ImageNavBar,
  Row,
  RowWrapper,
  StyledImageWrapper,
} from './styledComponents';

const ImageWrapper = ({ image, ...restProps }) => (
  <StyledImageWrapper {...restProps}>
    <ImageNavBar>
      <CircleWrapper>
        <CircleOne />
        <CircleTwo />
        <CircleThree />
      </CircleWrapper>
      <RowWrapper>
        <Row />
        <Row />
        <Row />
      </RowWrapper>
    </ImageNavBar>
    <Image src={image} />
  </StyledImageWrapper>
);

ImageWrapper.propTypes = { image: T.string.isRequired };

export default ImageWrapper;
