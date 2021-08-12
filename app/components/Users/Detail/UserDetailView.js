import React from 'react';
import T from 'prop-types';

import { BackNav, Coin } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';
import { formatUrlLinks } from 'utils/globalHelpers';

import UserMetricsView from './Metrics';
import UserTimelineView from './Timeline';
import {
  DetailContainer,
  DetailViewContainer,
  LinkIcon,
  LinksWrapper,
  Name,
  OneLinkWrapper,
  Rep,
  StyledA,
  UserCardWrapper,
  UserContentsWrapper,
  UserImage,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

export class UserDetailView extends React.PureComponent {
  render() {
    const {
      data: {
        activePullRequests,
        activity,
        completedPullRequests,
        createdDate,
        dollarsEarned,
        firstName,
        githubLink,
        lastName,
        personalLink,
        preferredLanguages,
        profilePic,
        rejectedPullRequests,
        rep,
        stackoverflowLink,
      },
      filterValues,
      handleInputChange,
    } = this.props;
    return (
      <DetailContainer>
        <BackNav label="Back to Users" path="/users" />
        <DetailViewContainer>
          <UserCardWrapper>
            <UserImage src={profilePic} />
            <Name>
              {firstName} {lastName}
            </Name>
            <LinksWrapper>
              {githubLink && (
                <OneLinkWrapper>
                  <LinkIcon>{GithubIcon}</LinkIcon>
                  <StyledA href={githubLink} target="_blank">
                    {formatUrlLinks({ githubLink })}
                  </StyledA>
                </OneLinkWrapper>
              )}
              {personalLink && (
                <OneLinkWrapper>
                  <LinkIcon>{PersonalIcon}</LinkIcon>
                  <StyledA href={personalLink} target="_blank">
                    {formatUrlLinks({ personalLink })}
                  </StyledA>
                </OneLinkWrapper>
              )}
              {stackoverflowLink && (
                <OneLinkWrapper>
                  <LinkIcon>{StackoverflowIcon}</LinkIcon>
                  <StyledA href={stackoverflowLink} target="_blank">
                    {formatUrlLinks({ stackoverflowLink })}
                  </StyledA>
                </OneLinkWrapper>
              )}
            </LinksWrapper>
            <Rep>
              <Coin />
              &nbsp;<b> {rep}</b>&nbsp;credits
            </Rep>
          </UserCardWrapper>
          <UserContentsWrapper>
            <UserMetricsView
              activePullRequests={activePullRequests}
              completedPullRequests={completedPullRequests}
              createdDate={createdDate}
              dollarsEarned={dollarsEarned}
              preferredLanguages={preferredLanguages}
              rejectedPullRequests={rejectedPullRequests}
            />
            <UserTimelineView
              activity={activity}
              filterValues={filterValues}
              handleInputChange={handleInputChange}
            />
          </UserContentsWrapper>
        </DetailViewContainer>
      </DetailContainer>
    );
  }
}

UserDetailView.propTypes = {
  data: T.object.isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default UserDetailView;
