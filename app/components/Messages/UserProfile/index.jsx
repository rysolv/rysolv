/* eslint-disable no-shadow, react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import {
  CandidateCardContent,
  CandidateCardDataCell,
  CandidateCardRow,
  CandidateCardRows,
  CandidateCardUserInfo,
  Data,
  Divider,
  ImageGroup,
  NameWrapper,
  PositionWrapper,
  ProfilePicWrapper,
  StyledLanguageWrapper,
  Title,
} from '../styledComponents';
import { StyledCandidateCardContainer } from './styledComponents';

const CandidateCard = ({ user }) => {
  const {
    lastPosition,
    location,
    name,
    preferredLanguages,
    profilePic,
    salary,
    type,
    yearsOfExperience,
  } = user;

  return (
    <StyledCandidateCardContainer>
      <CandidateCardContent>
        <ImageGroup>
          <ProfilePicWrapper src={profilePic} />
        </ImageGroup>
        <CandidateCardUserInfo>
          <NameWrapper>{name}</NameWrapper>
          <PositionWrapper>{lastPosition}</PositionWrapper>
          {preferredLanguages.map((language, index) => (
            <StyledLanguageWrapper
              key={`${language}-${index}`}
              language={language}
            />
          ))}
        </CandidateCardUserInfo>
        <Divider />
        <CandidateCardRows>
          <CandidateCardRow>
            <CandidateCardDataCell isTop>
              <Title>Experience</Title>
              <Data>{yearsOfExperience}</Data>
            </CandidateCardDataCell>
            <CandidateCardDataCell>
              <Title>Salary</Title>
              <Data>{salary}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
          <CandidateCardRow>
            <CandidateCardDataCell isTop>
              <Title>Location</Title>
              <Data>{location}</Data>
            </CandidateCardDataCell>
            <CandidateCardDataCell>
              <Title>Type</Title>
              <Data>{type}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
        </CandidateCardRows>
      </CandidateCardContent>
    </StyledCandidateCardContainer>
  );
};

CandidateCard.propTypes = { user: T.object.isRequired };

export default CandidateCard;
