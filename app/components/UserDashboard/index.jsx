import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import HiringBanner from './HiringBanner';
import HiringHeader from './HiringHeader';
import IssueCard from '../Issues/DashboardCard';
import UserProfile from './UserProfile';

import {
  ButtonContainer,
  DashboardWrapper,
  IssuesContainer,
  IssuesHeader,
  IssuesSubtitle,
  LeftColumn,
  ProfileColumn,
  StyledPrimaryButton,
} from './styledComponents';

const UserDashboard = ({ data, dispatchSetHiringStatus, handleNav }) => {
  const { hiringStatus, issues, surveyComplete } = data;

  const issueCards = issues.map(el => (
    <IssueCard
      data={{
        comments: el.comments,
        createdDate: el.createdDate,
        githubLink: el.githubLink,
        id: el.id,
        language: [el.language],
        repoId: el.repoId,
        repoName: el.repoName,
        title: el.name,
      }}
    />
  ));
  return (
    <DashboardWrapper>
      <LeftColumn>
        <ConditionalRender
          Component={HiringHeader}
          propsToPassDown={{
            handleNav,
            messages: 3,
          }}
          shouldRender={surveyComplete}
        />
        <ConditionalRender
          Component={HiringBanner}
          propsToPassDown={{
            handleNav,
            dispatchSetHiringStatus,
          }}
          shouldRender={!surveyComplete && hiringStatus === 'undeclared'}
        />
        <IssuesContainer>
          <IssuesHeader>Issues</IssuesHeader>
          <IssuesSubtitle>Solve Issues, improve your skills</IssuesSubtitle>
          {issueCards}
        </IssuesContainer>
        <ButtonContainer>
          <StyledPrimaryButton
            label="browse all issues"
            onClick={() => handleNav('/issues')}
          />
        </ButtonContainer>
      </LeftColumn>
      <ProfileColumn>
        <UserProfile
          data={data}
          dispatchSetHiringStatus={dispatchSetHiringStatus}
          handleNav={handleNav}
        />
      </ProfileColumn>
    </DashboardWrapper>
  );
};

UserDashboard.propTypes = {
  data: T.object.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserDashboard;
