import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { CommentIcon, LanguageWrapper } from 'components/base_ui';

import {
  IssueCard,
  StyledIssueHeader,
  IssueTitle,
  CenterRow,
  RepoNameWrapper,
  StyledPrimaryButton,
  IssueCardItem,
  IssueCardLabelWrapper,
  IssueCardIconWrapper,
} from './styledComponents';

const DashboardIssueCard = ({ data }) => {
  const {
    id,
    title,
    repoId,
    repoName,
    createdDate,
    comments,
    language,
    githubLink,
  } = data;
  return (
    <IssueCard>
      <StyledIssueHeader>
        <RepoNameWrapper>
          <Link to={`/repos/detail/${repoId}`}>{repoName}</Link>
        </RepoNameWrapper>
        {moment.utc(createdDate).fromNow()}
      </StyledIssueHeader>
      <IssueTitle>{title}</IssueTitle>

      <CenterRow>
        <div>
          {language.map(el => (
            <LanguageWrapper key={`${id}-${el}`} language={el} />
          ))}
        </div>
        <StyledPrimaryButton
          label="Start working"
          onClick={() => window.open(githubLink)}
        />
      </CenterRow>

      <IssueCardItem>
        <IssueCardIconWrapper>
          <CommentIcon />
        </IssueCardIconWrapper>
        <IssueCardLabelWrapper>
          <Link to="/issues">{comments} Comments</Link>
        </IssueCardLabelWrapper>
      </IssueCardItem>
    </IssueCard>
  );
};

DashboardIssueCard.propTypes = {
  data: T.object.isRequired,
};

export default DashboardIssueCard;
