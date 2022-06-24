/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { StyledLanguageWrapper, StyledTableCell } from './styledComponents';

const LanguagesCell = ({ preferredLanguages }) => (
  <StyledTableCell>
    {preferredLanguages.map((language, index) => (
      <StyledLanguageWrapper key={`${language}-${index}`} language={language} />
    ))}
  </StyledTableCell>
);

LanguagesCell.propTypes = { preferredLanguages: T.array.isRequired };

export default LanguagesCell;
