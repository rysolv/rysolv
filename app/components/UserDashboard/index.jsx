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

const UserDashboard = ({
  data,
  dispatchSetHiringStatus,
  handleNav,
  deviceView,
}) => {
  const { hiringStatus, issues, surveyComplete, matches } = data;
  const isMobileOrTablet = deviceView === 'mobile' || deviceView === 'tablet';
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
            matches,
          }}
          shouldRender={surveyComplete && !isMobileOrTablet}
        />
        <ConditionalRender
          Component={HiringBanner}
          propsToPassDown={{
            dispatchSetHiringStatus,
            handleNav,
          }}
          shouldRender={
            !surveyComplete &&
            hiringStatus === 'undeclared' &&
            !isMobileOrTablet
          }
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
        {/* Hiring header is moved to profileColumn on mobile */}
        <ConditionalRender
          Component={HiringHeader}
          propsToPassDown={{
            handleNav,
            matches,
          }}
          shouldRender={surveyComplete && isMobileOrTablet}
        />
        <ConditionalRender
          Component={HiringBanner}
          propsToPassDown={{
            handleNav,
            dispatchSetHiringStatus,
          }}
          shouldRender={
            !surveyComplete && hiringStatus === 'undeclared' && isMobileOrTablet
          }
        />
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
  deviceView: T.string.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserDashboard;
