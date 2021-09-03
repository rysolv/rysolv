import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { Circle } from 'components/base_ui';
import {
  CandidateCardButton,
  CandidateCardContainer,
  CandidateCardContent,
  CandidateCardDataCell,
  CandidateCardRow,
  CandidateCardRows,
  CandidateCardUserInfo,
  Data,
  Divider,
  NameWrapper,
  PicWrapper,
  PositionWrapper,
  ProfilePicWrapper,
  StyledLanguageWrapper,
  Title,
} from './styledComponents';

const AddIcon = iconDictionary('add');

const CandidateCard = ({
  dispatchSaveCandidate,
  index,
  isSaved,
  languages,
  lastPosition,
  location,
  name,
  percentMatch,
  profilePic,
  salary,
  type,
  yearsOfExperience,
}) => (
  <CandidateCardContainer isSaved={isSaved}>
    <CandidateCardContent>
      <PicWrapper>
        <ProfilePicWrapper src={profilePic} />
        <Circle percentage={percentMatch} />
      </PicWrapper>
      <CandidateCardUserInfo>
        <NameWrapper>{name}</NameWrapper>
        <PositionWrapper>{lastPosition}</PositionWrapper>
        {languages.map(language => (
          <StyledLanguageWrapper language={language} />
        ))}
      </CandidateCardUserInfo>
      <Divider />
      <CandidateCardRows>
        <CandidateCardRow>
          <CandidateCardDataCell>
            <Title>Experience</Title>
            <Data>{yearsOfExperience}</Data>
          </CandidateCardDataCell>
          <CandidateCardDataCell>
            <Title>Salary</Title>
            <Data>{salary}</Data>
          </CandidateCardDataCell>
        </CandidateCardRow>
        <CandidateCardRow>
          <CandidateCardDataCell>
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
    <CandidateCardButton onClick={() => dispatchSaveCandidate({ index })}>
      {AddIcon} {isSaved ? 'Unsave' : 'Save'} Profile
    </CandidateCardButton>
  </CandidateCardContainer>
);

CandidateCard.propTypes = {
  dispatchSaveCandidate: T.func.isRequired,
  index: T.number.isRequired,
  isSaved: T.bool.isRequired,
  languages: T.array.isRequired,
  lastPosition: T.string.isRequired,
  location: T.string.isRequired,
  name: T.string.isRequired,
  percentMatch: T.number.isRequired,
  profilePic: T.string.isRequired,
  salary: T.string.isRequired,
  type: T.string.isRequired,
  yearsOfExperience: T.string.isRequired,
};

export default CandidateCard;
