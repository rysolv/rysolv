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
  OuterWrapper,
  RowSection,
  RowSectionWrapper,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
} from './styledComponents';

const UserCard = ({ data, deviceView, handleNav }) => {
  const isMobile = deviceView === 'mobile';
  const hasLessItems = data.length === 1;
  return (
    <OuterWrapper>
      <RowSectionWrapper hasLessItems={hasLessItems}>
        <RowSection>
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
                      <NameWrapper
                        onClick={e =>
                          navHelper(e, handleNav, `/users/detail/${id}`)
                        }
                        href={`/users/detail/${id}`}
                      >
                        {username}
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
        </RowSection>
      </RowSectionWrapper>
    </OuterWrapper>
  );
};

UserCard.propTypes = {
  data: T.array.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
};

export default UserCard;
