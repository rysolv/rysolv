import React from 'react';
import T from 'prop-types';
import { StyledLanguageWrapper } from './styledComponents';

const LanguageWrapper = ({ language }) => (
  <StyledLanguageWrapper>{language}</StyledLanguageWrapper>
);
LanguageWrapper.propTypes = {
  language: T.oneOfType([T.number, T.string]),
};

export default LanguageWrapper;
