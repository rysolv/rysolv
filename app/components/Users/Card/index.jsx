/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { Star, ProfileImage } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';

import {
  ActiveContainer,
  ContentWrapper,
  IconWrapper,
  ImageContainer,
  IssuesContainer,
  IssuesWrapper,
  MemberInfoContainer,
  MemberWrapper,
  NameWrapper,
  NumberContainer,
  OverviewWrapper,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
} from './styledComponents';

const UserCard = ({ data, handleNav }) => (
  <OverviewWrapper>
    {data.map(
      (
        { attempting, createdDate, id, issues, name, pointsNumber, profilePic },
        index,
      ) => (
        <StyledListSquare key={`${name}-${index}`}>
          <StyledSquare>
            <StyledSettingWrapper>
              <MemberWrapper>
                <NameWrapper
                  onClick={e => navHelper(e, handleNav, `/users/detail/${id}`)}
                  href={`/users/detail/${id}`}
                >
                  {name}
                </NameWrapper>
                <MemberInfoContainer>
                  Member since {createdDate}
                </MemberInfoContainer>
              </MemberWrapper>
            </StyledSettingWrapper>
            <ContentWrapper>
              <ImageContainer>
                <ProfileImage
                  alt="Profile Image"
                  detailRoute={`/users/detail/${id}`}
                  handleNav={handleNav}
                  profilePic={profilePic}
                  size="7.5rem"
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
              <IssuesContainer>{issues.length} Issues</IssuesContainer>
              <ActiveContainer>{attempting.length} Attempting</ActiveContainer>
            </IssuesWrapper>
          </StyledSquare>
        </StyledListSquare>
      ),
    )}
  </OverviewWrapper>
);

UserCard.propTypes = {
  data: T.array.isRequired,
  handleNav: T.func.isRequired,
};

export default UserCard;
