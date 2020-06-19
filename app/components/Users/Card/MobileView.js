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
            name,
            pointsNumber,
            profilePic,
          },
          index,
        ) => (
          <StyledListSquare key={`${name}-${index}`}>
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
                    <NameWrapper
                      onClick={e =>
                        navHelper(e, handleNav, `/users/detail/${id}`)
                      }
                      href={`/users/detail/${id}`}
                    >
                      {name}
                    </NameWrapper>
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
