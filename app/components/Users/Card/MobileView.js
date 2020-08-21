/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { Star, ProfileImage } from 'components/base_ui';

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
  TextContainer,
} from './styledComponents';

const MobileUserCard = ({ data, deviceView, handleNav }) => {
  const isMobile = deviceView === 'mobile';

  return (
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
              <ContentWrapper>
                <ImageContainer>
                  <ProfileImage
                    alt="Profile Image"
                    detailRoute={`/users/detail/${id}`}
                    handleNav={handleNav}
                    profilePic={profilePic}
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
              <TextContainer>
                <StyledSettingWrapper>
                  <MemberWrapper>
                    <NameLink to={`/users/detail/${id}`}>{username}</NameLink>
                    <MemberInfoContainer>
                      Member since {createdDate}
                    </MemberInfoContainer>
                  </MemberWrapper>
                </StyledSettingWrapper>
                <IssuesWrapper>
                  <IssuesContainer>
                    {issues.length} {issues.length === 1 ? `Issue` : `Issues`}
                  </IssuesContainer>
                  <ActiveContainer>
                    {attempting.length} Attempting
                  </ActiveContainer>
                </IssuesWrapper>
              </TextContainer>
            </StyledSquare>
          </StyledListSquare>
        ),
      )}
    </OverviewWrapper>
  );
};

MobileUserCard.propTypes = {
  data: T.array.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
};

export default MobileUserCard;
