import React from 'react';
import T from 'prop-types';

import { LanguageWrapper } from 'components/base_ui';
import { generatePostedDate } from 'utils/globalHelpers';

import {
  IssueCardContainer,
  IssueCardHeader,
  IssueName,
  StyledLink,
  SolveIssueButton,
} from './styledComponents';

const RecommendedIssueCard = ({
  createdDate,
  githubLink,
  languages,
  name,
  repoId,
  repoName,
}) => (
  <IssueCardContainer>
    <IssueCardHeader>
      <StyledLink to={`/repos/detail/${repoId}`}>{repoName}</StyledLink>
      {generatePostedDate(createdDate)}
    </IssueCardHeader>
    <IssueName>{name}</IssueName>
    <div>
      {languages.map(language => (
        <LanguageWrapper key={`language-${language}`} language={language} />
      ))}
    </div>
    <SolveIssueButton
      disableRipple
      label="Solve"
      onClick={() => window.open(githubLink)}
    />
  </IssueCardContainer>
);

RecommendedIssueCard.propTypes = {
  createdDate: T.string.isRequired,
  githubLink: T.string.isRequired,
  languages: T.array.isRequired,
  name: T.string.isRequired,
  repoId: T.string.isRequired,
  repoName: T.string.isRequired,
};

export default RecommendedIssueCard;
