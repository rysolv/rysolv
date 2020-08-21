/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';

import { ImageLinkWrapper, Star } from 'components/base_ui';

import {
  ActiveContainer,
  ContentWrapper,
  IconWrapper,
  ImageContainer,
  IssuesContainer,
  IssuesWrapper,
  MemberInfoContainer,
  MemberWrapper,
  NameLink,
  NumberContainer,
  OverviewWrapper,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
  Users,
} from './styledComponents';

const UserCard = ({ data, deviceView }) => {
  const { length } = data;
  const isMobile = deviceView === 'mobile';

  return (
    <Fragment>
      <Users>
        {length} {length === 1 ? 'User' : 'Users'}
      </Users>
      <OverviewWrapper>
        {data.map(
          (
            {
              attempting,
              createdDate,
              id,
              issues,
              pointsNumber,
              profilePic,
              username,
            },
            index,
          ) => (
            <StyledListSquare key={`${username}-${index}`}>
              <StyledSquare>
                <StyledSettingWrapper>
                  <MemberWrapper>
                    <NameLink to={`/users/detail/${id}`}>{username}</NameLink>
                    <MemberInfoContainer>
                      Member since {createdDate}
                    </MemberInfoContainer>
                  </MemberWrapper>
                </StyledSettingWrapper>
                <ContentWrapper>
                  <ImageContainer>
                    <ImageLinkWrapper
                      alt="Profile Image"
                      image={profilePic}
                      route={`/users/detail/${id}`}
                      size={isMobile ? '4.75rem' : '7.5rem'}
                    />
                    <IconWrapper>
                      <div>
                        <Star />
                      </div>
                      <NumberContainer>{pointsNumber}</NumberContainer>
                    </IconWrapper>
                  </ImageContainer>
                </ContentWrapper>
                <IssuesWrapper>
                  <IssuesContainer>
                    {issues.length} {issues.length === 1 ? `Issue` : `Issues`}
                  </IssuesContainer>
                  <ActiveContainer>
                    {attempting.length} Attempting
                  </ActiveContainer>
                </IssuesWrapper>
              </StyledSquare>
            </StyledListSquare>
          ),
        )}
      </OverviewWrapper>
    </Fragment>
  );
};

UserCard.propTypes = {
  data: T.array.isRequired,
  deviceView: T.string.isRequired,
};

export default UserCard;
