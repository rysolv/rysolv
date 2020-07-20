import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import { BodyCard } from 'components/MarkdownRender';
import { navHelper } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  CommentWrapper,
  ExternalLinkWrapper,
  Icon,
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
  repo,
  setBodyChange,
  setLanguageChange,
  userProfile: { detailRoute, username },
}) => {
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

  const LanguagesComponent = (
    <Fragment>
      {language.map(el => (
        <LanguageWrapper key={`${el}`} language={el} />
      ))}
    </Fragment>
  );

  return (
    <Fragment>
      <PostingInfoWrapper>
        <div>
          Opened by{' '}
          <UsernameLink
            onClick={e => navHelper(e, handleNav, detailRoute)}
            href={detailRoute}
          >
            {username}
          </UsernameLink>{' '}
          on{' '}
          {moment(date)
            .utc()
            .format('M/D/YYYY')}
        </div>
        <ExternalLinkWrapper href={repo} target="_blank">
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
          Component={BodyCard}
          FallbackComponent={EditIssueBodyComponent}
          propsToPassDown={{ body }}
          shouldRender={!displayEditView}
        />
      </CommentWrapper>
    </Fragment>
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
  repo: T.string,
  setBodyChange: T.func,
  setLanguageChange: T.func,
  userProfile: T.object,
};

export default IssueDetailBody;
