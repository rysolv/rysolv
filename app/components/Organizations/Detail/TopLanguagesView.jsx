/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';

import LanguageAutocomplete from 'components/LanguageAutocomplete';
import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { blueColorSpectrum } from './constants';
import {
  Icon,
  Language,
  LanguageWrapper,
  StyledLanguageAutocomplete,
  StyledTitled,
  TopLanguagesContainer,
} from './styledComponents';

const CircleIcon = iconDictionary('circle');

export class TopLanguagesView extends React.PureComponent {
  render() {
    const {
      displayEditView,
      preferredLanguages,
      setLanguagesChange,
    } = this.props;

    const EditLanguagesComponent = (
      <StyledLanguageAutocomplete>
        <LanguageAutocomplete
          onChange={(e, value) =>
            setLanguagesChange(() => value.map(el => el.value))
          }
          value={preferredLanguages.map(el => ({
            value: el,
          }))}
        />
      </StyledLanguageAutocomplete>
    );

    const LanguagesComponent = (
      <LanguageWrapper>
        {preferredLanguages.map((language, index) => (
          <Language key={`list-item-${index}`}>
            <Icon color={blueColorSpectrum[index]}>{CircleIcon}</Icon>
            {language}
          </Language>
        ))}
      </LanguageWrapper>
    );

    return (
      <Fragment>
        <TopLanguagesContainer>
          <StyledTitled>Top languages</StyledTitled>
          <ConditionalRender
            Component={LanguagesComponent}
            FallbackComponent={EditLanguagesComponent}
            shouldRender={!displayEditView}
          />
        </TopLanguagesContainer>
      </Fragment>
    );
  }
}

TopLanguagesView.propTypes = {
  displayEditView: T.bool,
  preferredLanguages: T.array,
  setLanguagesChange: T.func,
};

export default TopLanguagesView;
