/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { issueDataDictionary } from 'containers/Issues/constants';
import { CommentCard } from 'components/Comments';
import { LanguageWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  DataWrapper,
  Divider,
  // IconWrapper,
  LabelWrapper,
  LanguageContainer,
  NameWrapper,
  StyledLink,
  ValueWrapper,
} from './styledComponents';

const LinkIcon = iconDictionary('link');
const CodeIcon = iconDictionary('code');

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const {
      data: { body, language, name, repo },
      activeUser: { id, profilePic, username },
      handleNav,
    } = this.props;

    const primaryUser = {
      small: true,
      detailRoute: `/users/detail/${id}`,
      alt: username,
      username,
      profilePic,
    };

    const languageDiv =
      language.value.length > 0
        ? language.value.map(el => <LanguageWrapper key={el} language={el} />)
        : 'None Listed';

    return (
      <DataWrapper>
        <ValueWrapper>
          <NameWrapper>{name.value}</NameWrapper>
        </ValueWrapper>
        <ValueWrapper>
          <CommentCard
            primary
            body={body.value}
            date={Date.now()}
            userProfile={primaryUser}
            handleNav={handleNav}
          />
        </ValueWrapper>
        <ValueWrapper>
          <Divider />
        </ValueWrapper>
        <LabelWrapper>{issueDataDictionary.language}</LabelWrapper>
        <ValueWrapper>
          <LanguageContainer>{languageDiv}</LanguageContainer>
        </ValueWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = {
  activeUser: T.object,
  data: T.object,
  handleNav: T.func,
};

export default VerifyForm;
