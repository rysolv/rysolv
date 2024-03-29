import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import Notification from './Notification';
import UserDashboardSideNav from './UserDashboardSideNav';
import RecommendedIssues from './RecommendedIssues';
import RecommendedJobs from './RecommendedJobs';
import {
  LeftContainer,
  UserDashboardContainer,
  UserDashboardContent,
  UserDashboardHeader,
} from './styledComponents';

const UserDashboard = ({
  deviceView,
  dispatchOpenModal,
  dispatchSetHiringStatus,
  handleNav,
  user,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const {
    firstName,
    hiringStatus,
    issues,
    jobs,
    matches,
    surveyComplete,
    unreadMessages,
  } = user;

  const isMobileOrTablet =
    deviceView === 'mobileXXS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobile' ||
    deviceView === 'tablet';

  const NotificationComponentToRender = () => {
    if (hiringStatus === 'undeclared' && !surveyComplete)
      return (
        <Notification
          handleClick={() => handleNav('/apply')}
          setIsNotificationOpen={setIsNotificationOpen}
          type="activeProfile"
        />
      );
    if (hiringStatus === 'active' && unreadMessages > 0)
      return (
        <Notification
          handleClick={() => handleNav('/messages')}
          matches={matches}
          setIsNotificationOpen={setIsNotificationOpen}
          type="unreadMessages"
        />
      );
    return null;
  };

  return (
    <UserDashboardContainer>
      <ConditionalRender
        Component={
          <Fragment>
            <div>
              <UserDashboardHeader>
                Welcome
                <ConditionalRender
                  Component={<Fragment>, {firstName}</Fragment>}
                  shouldRender={!!firstName}
                />
                !
              </UserDashboardHeader>
              <UserDashboardContent>
                <ConditionalRender
                  Component={NotificationComponentToRender}
                  shouldRender={isNotificationOpen}
                />
                <UserDashboardSideNav
                  dispatchOpenModal={dispatchOpenModal}
                  dispatchSetHiringStatus={dispatchSetHiringStatus}
                  handleNav={handleNav}
                  user={user}
                />
              </UserDashboardContent>
            </div>
            <RecommendedJobs handleNav={handleNav} jobs={jobs} />
            <RecommendedIssues
              dispatchOpenModal={dispatchOpenModal}
              handleNav={handleNav}
              issues={issues}
            />
          </Fragment>
        }
        FallbackComponent={
          <Fragment>
            <LeftContainer>
              <UserDashboardHeader>
                Welcome
                <ConditionalRender
                  Component={<Fragment>, {firstName}</Fragment>}
                  shouldRender={!!firstName}
                />
                !
              </UserDashboardHeader>
              <UserDashboardContent>
                <ConditionalRender
                  Component={NotificationComponentToRender}
                  shouldRender={
                    isNotificationOpen &&
                    (hiringStatus !== 'active' || !!unreadMessages)
                  }
                />
                <RecommendedJobs handleNav={handleNav} jobs={jobs} />
                <RecommendedIssues
                  dispatchOpenModal={dispatchOpenModal}
                  handleNav={handleNav}
                  issues={issues}
                />
              </UserDashboardContent>
            </LeftContainer>
            <UserDashboardSideNav
              dispatchOpenModal={dispatchOpenModal}
              dispatchSetHiringStatus={dispatchSetHiringStatus}
              handleNav={handleNav}
              user={user}
            />
          </Fragment>
        }
        shouldRender={isMobileOrTablet}
      />
    </UserDashboardContainer>
  );
};

UserDashboard.propTypes = {
  deviceView: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  handleNav: T.func.isRequired,
  user: T.object.isRequired,
};

export default UserDashboard;
