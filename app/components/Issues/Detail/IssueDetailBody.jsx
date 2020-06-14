import React from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { LanguageWrapper } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ExternalLinkWrapper,
  Icon,
  IssueBody,
  IssueBodyContainer,
  LanguagesTitle,
  LanguagesWrapper,
  PostingInfoWrapper,
  UsernameLink,
} from './styledComponents';

const GithubIcon = iconDictionary('github');

const IssueDetailBody = ({ body, date, handleNav, language, userProfile }) => {
  const { username } = userProfile;
  const html = marked(body);

  return (
    <IssueBodyContainer>
      <PostingInfoWrapper>
        <div>
          Opened by{' '}
          <UsernameLink
            onClick={e => navHelper(e, handleNav, `/users/detail/${username}`)}
            href={`/users/detail/${username}`}
          >
            {username}
          </UsernameLink>{' '}
          on{' '}
          {moment(date)
            .utc()
            .format('M/D/YYYY')}
        </div>
        <ExternalLinkWrapper>
          <Icon>{GithubIcon}</Icon> View on Github
        </ExternalLinkWrapper>
      </PostingInfoWrapper>
      <LanguagesWrapper>
        <LanguagesTitle>Languages:</LanguagesTitle>
        {language.map(el => (
          <LanguageWrapper key={`${el}`} language={el} />
        ))}
      </LanguagesWrapper>
      <IssueBody dangerouslySetInnerHTML={{ __html: html }} />
    </IssueBodyContainer>
  );
};

IssueDetailBody.propTypes = {
  body: T.string,
  date: T.string,
  handleNav: T.func,
  language: T.array,
  userProfile: T.object,
};

export default IssueDetailBody;
