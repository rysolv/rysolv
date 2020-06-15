import React, { Fragment } from 'react';
import T from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  CommentWrapper,
  ExternalLinkWrapper,
  Icon,
  IssueBody,
  IssueBodyContainer,
  LanguagesTitle,
  LanguagesWrapper,
  PostingInfoWrapper,
  StyledLanguageAutocomplete,
  StyledMarkdown,
  UsernameLink,
} from './styledComponents';

const GithubIcon = iconDictionary('github');

const IssueDetailBody = ({
  body,
  bodyChange,
  date,
  displayEditView,
  handleNav,
  language,
  languageChange,
  setBodyChange,
  setLanguageChange,
  userProfile,
}) => {
  const { username } = userProfile;
  const html = marked(body);

  const EditIssueBodyComponent = (
    <StyledMarkdown edit body={bodyChange} handleInput={setBodyChange} />
  );

  const EditLanguagesComponent = (
    <StyledLanguageAutocomplete
      onChange={(e, value) =>
        setLanguageChange(() => value.map(el => el.value))
      }
      value={languageChange.map(el => ({
        value: el,
      }))}
    />
  );

  const IssueBodyComponent = (
    <IssueBody dangerouslySetInnerHTML={{ __html: html }} />
  );

  const LanguagesComponent = (
    <Fragment>
      {language.map(el => (
        <LanguageWrapper key={`${el}`} language={el} />
      ))}
    </Fragment>
  );

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
      <CommentWrapper>
        <LanguagesWrapper>
          <LanguagesTitle>Languages:</LanguagesTitle>
          <ConditionalRender
            Component={LanguagesComponent}
            FallbackComponent={EditLanguagesComponent}
            shouldRender={!displayEditView}
          />
        </LanguagesWrapper>
        <ConditionalRender
          Component={IssueBodyComponent}
          FallbackComponent={EditIssueBodyComponent}
          shouldRender={!displayEditView}
        />
      </CommentWrapper>
    </IssueBodyContainer>
  );
};

IssueDetailBody.propTypes = {
  body: T.string,
  bodyChange: T.string,
  date: T.string,
  displayEditView: T.bool,
  handleNav: T.func,
  language: T.array,
  languageChange: T.array,
  setBodyChange: T.func,
  setLanguageChange: T.func,
  userProfile: T.object,
};

export default IssueDetailBody;
