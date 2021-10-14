import React from 'react';
import T from 'prop-types';

import HiringHeader from './HiringHeader';
import IssueCard from '../Issues/DashboardCard';

import {
  DashboardWrapper,
  IssuesContainer,
  IssuesHeader,
  IssuesSubtitle,
  LeftColumn,
  ProfileColumn,
  ProfileDetailContainer,
  ProfileDetailItem,
  ProfilePicture,
} from './styledComponents';

const UserDashboard = ({
  data,
  deviceView,
  dismissBanner,
  displayBanner,
  handleNav,
}) => {
  const { profilePic } = data;
  return (
    <DashboardWrapper>
      <LeftColumn>
        <HiringHeader
          dismissBanner={dismissBanner}
          displayBanner={displayBanner}
          handleNav={handleNav}
          hiring={false}
          messages={3}
        />
        <IssuesContainer>
          <IssuesHeader>Issues</IssuesHeader>
          <IssuesSubtitle>Solve Issues, improve your skills</IssuesSubtitle>
          <IssueCard data={{ title: 'Solve me please' }} />
          <IssueCard data={{ title: 'Solve me please' }} />
          <IssueCard data={{ title: 'Solve me please' }} />
        </IssuesContainer>
      </LeftColumn>
      <ProfileColumn>
        <ProfilePicture src={profilePic} />
        <ProfileDetailContainer>
          <ProfileDetailItem>Name</ProfileDetailItem>
          <ProfileDetailItem>email</ProfileDetailItem>
        </ProfileDetailContainer>
      </ProfileColumn>
    </DashboardWrapper>
  );
};

UserDashboard.propTypes = {
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
};

export default UserDashboard;
