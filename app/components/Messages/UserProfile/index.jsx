/* eslint-disable no-shadow, react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  CandidateCardButton,
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

const CandidateCard = ({ handleNav, user }) => {
  const {
    experience,
    lastPosition,
    location,
    name,
    preferredLanguages,
    profilePic,
    target_salary: salary,
    type,
    username,
  } = user;

  const UserIcon = iconDictionary('people');

  const handleClick = () => {
    handleNav(`/profile/${username}`);
  };

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
              <Data>{experience}</Data>
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
      <CandidateCardButton onClick={handleClick}>
        {UserIcon} Candidate profile
      </CandidateCardButton>
    </StyledCandidateCardContainer>
  );
};

CandidateCard.propTypes = {
  handleNav: T.func.isRequired,
  user: T.object.isRequired,
};

export default CandidateCard;
