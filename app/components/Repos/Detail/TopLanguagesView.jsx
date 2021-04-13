/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import { LanguagesWrapper, StyledLanguage } from './styledComponents';

export class TopLanguagesView extends React.PureComponent {
  render() {
    const { preferredLanguages } = this.props;

    return (
      <ConditionalRender
        Component={() => (
          <LanguagesWrapper>
            {preferredLanguages.map((language, index) => (
              <StyledLanguage key={`list-item-${index}`} language={language} />
            ))}
          </LanguagesWrapper>
        )}
        shouldRender={!!preferredLanguages.length}
      />
    );
  }
}

TopLanguagesView.propTypes = { preferredLanguages: T.array.isRequired };

export default TopLanguagesView;
