import React from 'react';
import T from 'prop-types';

import { LanguageWrapper } from 'components/base_ui';
import { CommentCard } from 'components/MarkdownRender';
import { issueDataDictionary } from 'containers/Issues/constants';

import {
  DataWrapper,
  Divider,
  LabelWrapper,
  LanguageContainer,
  NameWrapper,
  StyledLink,
  ValueWrapper,
} from './styledComponents';

export class VerifyForm extends React.PureComponent {
  render() {
    const {
      issueData: { issueBody, issueLanguages, issueName, issueUrl },
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
    const mapLanguages = array => {
      if (array.value.length > 0) {
        return array.value.map(el => (
          <LanguageWrapper key={el} language={el} />
        ));
      }
      return 'None Listed';
    };

    const languageDiv = mapLanguages(issueLanguages);

    return (
      <DataWrapper>
        <ValueWrapper>
          <NameWrapper>{issueName.value}</NameWrapper>
        </ValueWrapper>
        <StyledLink>{issueUrl.value}</StyledLink>
        <ValueWrapper>
          <CommentCard
            body={issueBody.value}
            date={Date.now()}
            handleNav={handleNav}
            userProfile={primaryUser}
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
  issueData: T.object,
  handleNav: T.func,
};

export default VerifyForm;
