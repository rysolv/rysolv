/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { Coin, ImageLinkWrapper } from 'components/base_ui';

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
  OuterWrapper,
  RowSection,
  RowSectionWrapper,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
} from './styledComponents';

const UserCard = ({ data, deviceView }) => {
  const isMobile =
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  const hasOneItem = data.length === 1;
  return (
    <OuterWrapper>
      <RowSectionWrapper hasOneItem={hasOneItem}>
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
                          <Coin />
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
};

export default UserCard;
