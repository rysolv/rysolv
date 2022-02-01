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
  const isMobileS =
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
              { attempting, issues, pointsNumber, profilePic, username },
              index,
            ) => (
              <StyledListSquare key={`${username}-${index}`}>
                <StyledSquare>
                  <StyledSettingWrapper>
                    <MemberWrapper>
                      <NameLink to={`/users/${username}`}>{username}</NameLink>
                    </MemberWrapper>
                  </StyledSettingWrapper>
                  <ContentWrapper>
                    <ImageContainer>
                      <ImageLinkWrapper
                        alt="Profile Image"
                        image={profilePic}
                        route={`/users/${username}`}
                        size={isMobileS ? '4.75rem' : '7.5rem'}
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
