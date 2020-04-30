/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { blueColorSpectrum } from './constants';
import {
  Icon,
  Language,
  LanguageWrapper,
  StyledTitled,
  TopLanguagesContainer,
} from './styledComponents';

const CircleIcon = iconDictionary('circle');

export class TopLanguagesView extends React.PureComponent {
  render() {
    const { preferredLanguages } = this.props;

    return (
      <Fragment>
        <TopLanguagesContainer>
          <StyledTitled>Top languages</StyledTitled>
          <LanguageWrapper>
            {preferredLanguages.map((language, index) => (
              <Language key={`list-item-${index}`}>
                <Icon color={blueColorSpectrum[index]}>{CircleIcon}</Icon>
                {language}
              </Language>
            ))}
          </LanguageWrapper>
        </TopLanguagesContainer>
      </Fragment>
    );
  }
}

TopLanguagesView.propTypes = { preferredLanguages: T.array };

export default TopLanguagesView;
