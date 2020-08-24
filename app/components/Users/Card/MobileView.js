/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ImageLinkWrapper } from 'components/base_ui';

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
  RowSection,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
  StyledStar,
  TextContainer,
} from './styledComponents';

const MobileUserCard = ({ data, deviceView }) => {
  const isMobile =
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  return (
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
              <ContentWrapper>
                <ImageContainer>
                  <ImageLinkWrapper
                    alt="Profile Image"
                    image={profilePic}
                    route={`/users/detail/${id}`}
                    size={isMobile ? '4.75rem' : '7.5rem'}
                  />
                  <IconWrapper>
                    <StyledStar />
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
    </RowSection>
  );
};

MobileUserCard.propTypes = {
  data: T.array.isRequired,
  deviceView: T.string.isRequired,
};

export default MobileUserCard;
