/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { actionDictionary } from 'containers/Settings/constants';
import { formatDollarAmount, formatWordString } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyOverviewListComponent,
  OverviewListComponent,
} from '../OverviewList';
import {
  ExternalTimelineActivity,
  HeaderContainer,
  InternalTimelineActivity,
  StyledBaseDropDownMenu,
  StyledButton,
  TimelineContainer,
  TimelineContent,
  TimelineDividerContainer,
  TimelineDollar,
  TimelineHeader,
  TimelineHorizontalDivider,
  TimelineInfo,
  TimelineListItem,
  TimelineTitle,
  TimelineType,
  TimelineVerticalDivider,
  StyledAction,
  ActivityContainer,
} from './styledComponents';
import {
  EmptyComponentContainer,
  HeaderWrapper,
  StyledH3,
} from '../styledComponents';
import ProfileComponent from '../Profile';
import VerifiedAccountsView from '../VerifiedAccounts';

const ViewAllIcon = iconDictionary('navigateNext');

const UserTimelineView = ({
  activePullRequests,
  activity,
  attempting,
  changeGithub,
  changePersonal,
  changeStackoverflow,
  changeUserImage,
  completedPullRequests,
  createdDate,
  dispatchOpenModal,
  displayBottom,
  dollarsEarned,
  filterValues: { users: usersFilter },
  firstName,
  githubLink,
  githubUsername,
  handleClose,
  handleEdit,
  handleInputChange,
  handleNav,
  handleRemoveAttempting,
  handleRemoveWatching,
  handleSubmitInputChange,
  handleValidateInput,
  inputErrors,
  isDisabled,
  isGithubVerified,
  lastName,
  personalLink,
  profilePic,
  rejectedPullRequests,
  rep,
  setChangeGithub,
  setChangePersonal,
  setChangeStackoverflow,
  setChangeUserImage,
  setIsDisabled,
  setValue,
  skills,
  stackoverflowLink,
  value,
  watching,
}) => {
  const filterActivity = () => {
    const filteredArray = activity.filter(({ action }) => {
      if (usersFilter === 'All' || actionDictionary[usersFilter] === action) {
        return true;
      }
      return false;
    });
    return filteredArray;
  };
  const filteredActivity = filterActivity();

  const AttemptingComponent = () => (
    <ConditionalRender
      Component={OverviewListComponent}
      FallbackComponent={<EmptyOverviewListComponent type="attempting" />}
      propsToPassDown={{
        handleNav,
        handleRemoveAttempting,
        list: attempting.slice(0, 5),
        type: 'attempting',
      }}
      shouldRender={!!attempting.length}
    />
  );
  const WatchingComponent = () => (
    <ConditionalRender
      Component={OverviewListComponent}
      FallbackComponent={<EmptyOverviewListComponent type="watching" />}
      propsToPassDown={{
        handleNav,
        handleRemoveAttempting,
        handleRemoveWatching,
        list: watching.slice(0, 5),
        type: 'watching',
      }}
      shouldRender={!!watching.length}
    />
  );

  const ActivityComponent = () =>
    filteredActivity.map(
      (
        {
          action,
          activityId,
          date,
          fundedValue,
          icon,
          isInternalLink,
          path,
          target: { targetName, targetType },
        },
        index,
      ) => {
        const shouldRenderFor = targetType === 'account with';
        const TimelineListItemComponent = (
          <TimelineListItem key={activityId}>
            <TimelineDividerContainer>
              <TimelineVerticalDivider />
              {icon}
            </TimelineDividerContainer>
            <TimelineContent>
              <TimelineType>
                <StyledAction>{formatWordString(action)}</StyledAction>&nbsp;
                {targetType}
              </TimelineType>
              <TimelineInfo>
                <ConditionalRender
                  Component={
                    <Fragment>
                      <TimelineDollar>
                        {formatDollarAmount(fundedValue)}
                      </TimelineDollar>
                      <ConditionalRender
                        Component={() => ` for `}
                        shouldRender={!shouldRenderFor}
                      />
                    </Fragment>
                  }
                  shouldRender={!!fundedValue}
                />
                <ConditionalRender
                  Component={
                    <InternalTimelineActivity to={path}>
                      {targetName}
                    </InternalTimelineActivity>
                  }
                  FallbackComponent={
                    <ExternalTimelineActivity href={path} target="_blank">
                      {targetName}
                    </ExternalTimelineActivity>
                  }
                  shouldRender={isInternalLink}
                />
              </TimelineInfo>
            </TimelineContent>
          </TimelineListItem>
        );

        if (
          index === 0 ||
          moment(date).format('YYYY/MM/DD') !==
            moment(filteredActivity[index - 1].date).format('YYYY/MM/DD')
        ) {
          return (
            <Fragment key={`list-item-${index}`}>
              <TimelineHeader>
                <TimelineTitle>{moment(date).format('MMMM DD')}</TimelineTitle>
                <TimelineHorizontalDivider />
              </TimelineHeader>
              {TimelineListItemComponent}
            </Fragment>
          );
        }
        return TimelineListItemComponent;
      },
    );

  return (
    <TimelineContainer>
      <ProfileComponent
        activePullRequests={activePullRequests}
        changeGithub={changeGithub}
        changePersonal={changePersonal}
        changeStackoverflow={changeStackoverflow}
        changeUserImage={changeUserImage}
        completedPullRequests={completedPullRequests}
        createdDate={createdDate}
        dispatchOpenModal={dispatchOpenModal}
        displayBottom={displayBottom}
        dollarsEarned={dollarsEarned}
        firstName={firstName}
        githubLink={githubLink}
        handleClose={handleClose}
        handleEdit={handleEdit}
        handleSubmitInputChange={handleSubmitInputChange}
        handleValidateInput={handleValidateInput}
        inputErrors={inputErrors}
        isDisabled={isDisabled}
        lastName={lastName}
        personalLink={personalLink}
        profilePic={profilePic}
        rejectedPullRequests={rejectedPullRequests}
        rep={rep}
        setChangeGithub={setChangeGithub}
        setChangePersonal={setChangePersonal}
        setChangeStackoverflow={setChangeStackoverflow}
        setChangeUserImage={setChangeUserImage}
        setIsDisabled={setIsDisabled}
        setValue={setValue}
        skills={skills}
        stackoverflowLink={stackoverflowLink}
        value={value}
      />
      <ActivityContainer>
        <VerifiedAccountsView
          githubUsername={githubUsername}
          isGithubVerified={isGithubVerified}
        />
        <div>
          <HeaderContainer>
            <StyledH3>Your Attempting</StyledH3>
            <ConditionalRender
              Component={
                <StyledButton
                  disableRipple
                  onClick={() => handleNav('/settings/attempting')}
                >
                  View All
                  {ViewAllIcon}
                </StyledButton>
              }
              shouldRender={!!attempting.length}
            />
          </HeaderContainer>
          <AttemptingComponent />
        </div>
        <div>
          <HeaderContainer>
            <StyledH3>Your Watching</StyledH3>
            <ConditionalRender
              Component={
                <StyledButton
                  disableRipple
                  onClick={() => handleNav('/settings/watching')}
                >
                  View All
                  {ViewAllIcon}
                </StyledButton>
              }
              shouldRender={!!watching.length}
            />
          </HeaderContainer>
          <WatchingComponent />
        </div>
        <HeaderWrapper>
          <StyledH3>All Activity</StyledH3>
          <StyledBaseDropDownMenu
            handleChange={el =>
              handleInputChange({ field: 'users', form: 'filter', value: el })
            }
            selectedValue={usersFilter}
            values={['All', 'Commented', 'Earned', 'Funded', 'Submitted']}
          />
        </HeaderWrapper>
        <ConditionalRender
          Component={ActivityComponent}
          FallbackComponent={
            <EmptyComponentContainer>
              No recent activity.
            </EmptyComponentContainer>
          }
          shouldRender={filteredActivity.length > 0}
        />
      </ActivityContainer>
    </TimelineContainer>
  );
};

UserTimelineView.propTypes = {
  activePullRequests: T.number.isRequired,
  activity: T.array,
  attempting: T.array.isRequired,
  changeGithub: T.bool.isRequired,
  changePersonal: T.bool.isRequired,
  changeStackoverflow: T.bool.isRequired,
  changeUserImage: T.bool.isRequired,
  completedPullRequests: T.number.isRequired,
  createdDate: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  displayBottom: T.bool.isRequired,
  dollarsEarned: T.number.isRequired,
  filterValues: T.object.isRequired,
  firstName: T.string.isRequired,
  githubLink: T.string,
  githubUsername: T.string,
  handleClose: T.func.isRequired,
  handleEdit: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveAttempting: T.func.isRequired,
  handleRemoveWatching: T.func.isRequired,
  handleSubmitInputChange: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  inputErrors: T.object.isRequired,
  isDisabled: T.bool.isRequired,
  isGithubVerified: T.bool.isRequired,
  lastName: T.string.isRequired,
  personalLink: T.string,
  profilePic: T.string.isRequired,
  rejectedPullRequests: T.number.isRequired,
  rep: T.number.isRequired,
  setChangeGithub: T.func.isRequired,
  setChangePersonal: T.func.isRequired,
  setChangeStackoverflow: T.func.isRequired,
  setChangeUserImage: T.func.isRequired,
  setIsDisabled: T.func.isRequired,
  setValue: T.func.isRequired,
  skills: T.array.isRequired,
  stackoverflowLink: T.string,
  value: T.oneOfType([T.array, T.string]).isRequired,
  watching: T.array.isRequired,
};

export default UserTimelineView;
