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
  MemberWrapper,
  NameLink,
  NumberContainer,
  RowSection,
  StyledCoin,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
  TextContainer,
} from './styledComponents';

const MobileUserCard = ({ data, deviceView }) => {
  const isMobileS =
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  return (
    <RowSection>
      {data.map(
        (
          { attempting, id, issues, pointsNumber, profilePic, username },
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
                    size={isMobileS ? '6.5rem' : '7.5rem'}
                  />
                  <IconWrapper>
                    <StyledCoin />
                    <NumberContainer>{pointsNumber}</NumberContainer>
                  </IconWrapper>
                </ImageContainer>
              </ContentWrapper>
              <TextContainer>
                <StyledSettingWrapper>
                  <MemberWrapper isMobileS>
                    <NameLink to={`/users/detail/${id}`}>{username}</NameLink>
                  </MemberWrapper>
                </StyledSettingWrapper>
                <IssuesWrapper isMobileS>
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
